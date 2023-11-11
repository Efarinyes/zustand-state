import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus
}


export const useTasks = ({ status }: Options ) => {

    const isDragging = useTaskStore(state => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const addTask = useTaskStore(state => state.addTask);

    const [onDragOver, setOnDragOver] = useState(false)

    const handleAddTask = async () => {

        const { isConfirmed, value } = await Swal.fire({
            title: 'Nova tasca',
            input: 'text',
            inputLabel: 'Nom de la tasca',
            inputPlaceholder: 'Escriu el nom de la tasca',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Cal un títol de la tasca'
                }
            }
        });

        if (!isConfirmed) return
        addTask(value, status);
    }
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(true);
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status)
    }



    return {
        isDragging,
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,

    }


}


