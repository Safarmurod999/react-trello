import React, { useEffect, useRef, useState } from 'react';
import { addCard, deleteCard, deleteColumn, updateCard } from '../store/kanbanSlice';
import { useDispatch } from 'react-redux';
import { EllipsisHorizontalIcon, PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Draggable, Droppable } from '@hello-pangea/dnd';

const Column = ({ column }) => {
  const dispatch = useDispatch()
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardContent, setNewCardContent] = useState('')
  const [editingCardId, setEditingCardId] = useState(null)
  const [editingContent, setEditingContent] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const addCardInputRef = useRef(null)

  useEffect(() => {
    if (isAddingCard) {
      addCardInputRef.current?.focus()
    }
  }, [isAddingCard])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAddCard = () => {
    if (newCardContent.trim()) {
      dispatch(addCard({
        columnId: column.id,
        card: { id: `card-${Date.now()}`, content: newCardContent.trim() }
      }))
      setNewCardContent('')
      setIsAddingCard(false)
    }
  }

  const handleEditCard = (cardId) => {
    const cardToEdit = column.cards.find(card => card.id === cardId)
    if (cardToEdit) {
      setEditingCardId(cardId)
      setEditingContent(cardToEdit.content)
    }
  }

  const handleSaveEdit = () => {
    if (editingCardId) {
      dispatch(updateCard({
        columnId: column.id,
        cardId: editingCardId,
        content: editingContent.trim()
      }))
      setEditingCardId(null)
      setEditingContent('')
    }
  }

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(deleteCard({ columnId: column.id, cardId }))
    }
  }
  const handleDeleteColumn = () => {
    dispatch(deleteColumn({ columnId: column.id }))
  }
  return (
    <div className="h-auto">
      <div className="w-72 rounded-xl overflow-hidden bg-dark-bg p-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <input className="text-white bg-dark-bg font-medium px-1" value={column.title} disabled/>
          <div className="flex items-center gap-1">
            <button className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fill="currentcolor" d="M8.062 11 6.5 9.914A1 1 0 0 1 7.914 8.5l2.616 2.616c.28.167.47.5.47.884s-.19.717-.47.884L7.914 15.5A1 1 0 1 1 6.5 14.086L8.062 13h-3.68c-.487 0-.882-.448-.882-1s.395-1 .882-1zm5.408 1.884c-.28-.167-.47-.5-.47-.884s.19-.717.47-.884L16.086 8.5A1 1 0 0 1 17.5 9.914L15.938 11h3.68c.487 0 .882.448.882 1s-.395 1-.882 1h-3.68l1.562 1.086a1 1 0 0 1-1.414 1.414z"></path></svg>
            </button>
            <div className="relative">
              <button
                className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </button>
              {isMenuOpen && (
                <div ref={menuRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleDeleteColumn} role="menuitem">Delete Column</div>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => setIsAddingCard(true)} role="menuitem">Add card</div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`min-h-[50px] ${snapshot.isDraggingOver ? 'bg-gray-gray-700 rounded-lg' : ''}`}
            >
              {column.cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-dark-gray p-2 rounded-lg shadow-sm border-2 border-dark-gray hover:border-text-color mb-2 ${snapshot.isDragging ? 'opacity-75' : ''
                        }`}
                    >
                      {editingCardId === card.id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="flex-grow bg-gray-700 text-text-color text-sm p-1 rounded"
                          />
                          <button onClick={handleSaveEdit} className="ml-2 text-green-500 hover:text-green-400">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingCardId(null)} className="ml-2 text-red-500 hover:text-red-400">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-white text-sm">{card.content}</p>
                          <div className="flex items-center">
                            <button onClick={() => handleEditCard(card.id)} className="text-gray-400 hover:text-white mr-1">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteCard(card.id)} className="text-gray-400 hover:text-white">
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {isAddingCard ? (
          <div className="mt-2">
            <textarea
              ref={addCardInputRef}
              value={newCardContent}
              onChange={(e) => setNewCardContent(e.target.value)}
              className="w-full p-2 bg-dark-gray text-text-color outline-none text-sm rounded-lg resize-none"
              placeholder="Enter a title or paste a link..."
              rows={3}
            />
            <div className="flex space-x-1">
              <button
                onClick={handleAddCard}
                className="bg-blue-color text-dark-bg px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Add card
              </button>
              <button
                onClick={() => setIsAddingCard(false)}
                className="text-white p-[5px] rounded hover:bg-white/10"
              >
                <XMarkIcon className="w-6 h-6 text-text-color" />
              </button>
            </div>
          </div>
        ) : (
          <div className='flex space-x-1  group mt-2 cursor-pointer'>
            <div
              onClick={() => setIsAddingCard(true)}
              className="flex items-center w-full p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              <span>Add a card</span>
            </div>
            <div className='p-2 flex items-center justify-center  hover:bg-white/10 rounded-md'>
              <svg className='text-text-color' width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6V5C3 3.89543 3.89543 3 5 3H6C6.55228 3 7 3.44772 7 4C7 4.55228 6.55228 5 6 5H5V6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6Z" fill="currentColor"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 8C6 6.89543 6.89543 6 8 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H8C6.89543 20 6 19.1046 6 18V8ZM8 8H19V14H8V8ZM18 18C17.4477 18 17 17.5523 17 17C17 16.4477 17.4477 16 18 16C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18ZM8 17C8 17.5523 8.44772 18 9 18H12C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16H9C8.44772 16 8 16.4477 8 17Z" fill="currentColor"></path>
                <path d="M4 14C3.44772 14 3 14.4477 3 15V16C3 17.1046 3.89543 18 5 18V15C5 14.4477 4.55228 14 4 14Z" fill="currentColor"></path><path d="M3 9C3 8.44772 3.44772 8 4 8C4.55228 8 5 8.44772 5 9V12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12V9Z" fill="currentColor"></path>
                <path d="M8 4C8 3.44772 8.44772 3 9 3H13C13.5523 3 14 3.44772 14 4C14 4.55228 13.5523 5 13 5H9C8.44772 5 8 4.55228 8 4Z" fill="currentColor"></path><path d="M16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5H19C19 3.89543 18.1046 3 17 3H16Z" fill="currentColor"></path>
              </svg>
            </div>

          </div>)}
      </div>
    </div>
  )
};

export default Column;
