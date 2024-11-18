import Column from './Column';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addColumn, moveCard } from '../store/kanbanSlice';
import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { DragDropContext } from '@hello-pangea/dnd';

const KanbanBoard = () => {
    const columns = useSelector((state) => state.board.columns)
    const dispatch = useDispatch()
    const [newColumnTitle, setNewColumnTitle] = useState('')
    const [isAddingColumn, setIsAddingColumn] = useState(false)

    const onDragEnd = (result) => {
        const { source, destination } = result
        if (!destination) return

        dispatch(moveCard({
            sourceColumnId: source.droppableId,
            destinationColumnId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index
        }))
    }

    const handleAddColumn = () => {
        if (newColumnTitle.trim()) {
            const newColumnId = `column-${Date.now()}`
            dispatch(addColumn({ id: newColumnId, title: newColumnTitle.trim() }))
            setNewColumnTitle('')
            setIsAddingColumn(false)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto p-4 space-x-4 h-full">
                {Object.values(columns).map((column) => (
                    <Column key={column.id} column={column} />
                ))}
                {isAddingColumn ? (
                    <div className="w-72 flex-shrink-0 bg-dark-bg rounded-xl overflow-hidden p-3">
                        <input
                            type="text"
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            className="w-full p-2 bg-dark-gray text-text-color rounded-lg mb-2 focus:outline-blue-color"
                            placeholder="Enter list name..."
                        />
                        <div className="flex space-x-1">
                            <button
                                onClick={handleAddColumn}
                                className="bg-blue-color text-dark-bg px-3 py-1 rounded hover:opacity-[0.8]"
                            >
                                Add List
                            </button>
                            <button
                                onClick={() => setIsAddingColumn(false)}
                                className="text-white p-[5px] rounded hover:bg-white/10"
                            >
                                <XMarkIcon className="w-6 h-6 text-text-color" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={() => setIsAddingColumn(true)}
                            className="w-72 flex justify-start items-center gap-[5px] flex-shrink-0 p-3 bg-light-pink text-white rounded-xl hover:opacity-[0.8]"
                        >
                            <PlusIcon className="w-6 h-6" />
                            <span>Add another list</span>
                        </button>
                    </div>
                )}
            </div>
        </DragDropContext>
    )
};

export default KanbanBoard;