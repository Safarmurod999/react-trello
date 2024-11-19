import { createSlice } from "@reduxjs/toolkit"

const initialObj = {
    'todo': {
        id: 'todo',
        title: 'To do',
        cards: [
            { id: 'card-1', content: 'Project planning' },
            { id: 'card-2', content: 'Kickoff meeting' }
        ]
    },
    'doing': {
        id: 'doing',
        title: 'Doing',
        cards: []
    },
    'done': {
        id: 'done',
        title: 'Done',
        cards: []
    }
}
const initialState = {
    columns: JSON.parse(localStorage.getItem('columns')) || initialObj
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addColumn: (state, action) => {
            const { id, title } = action.payload
            state.columns[id] = { id, title, cards: [] }
            localStorage.setItem('columns', JSON.stringify(state.columns))
        },
        addCard: (state, action) => {
            const { columnId, card } = action.payload
            state.columns[columnId].cards.push(card)
            localStorage.setItem('columns', JSON.stringify(state.columns))
        },
        updateCard: (state, action) => {
            const { columnId, cardId, content } = action.payload
            const card = state.columns[columnId].cards.find(c => c.id === cardId)
            if (card) card.content = content
            localStorage.setItem('columns', JSON.stringify(state.columns))
        },
        deleteCard: (state, action) => {
            const { columnId, cardId } = action.payload
            state.columns[columnId].cards = state.columns[columnId].cards.filter(c => c.id !== cardId)
            localStorage.setItem('columns', JSON.stringify(state.columns))
        },
        moveCard: (state, action) => {
            const { sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload
            const [movedCard] = state.columns[sourceColumnId].cards.splice(sourceIndex, 1)
            state.columns[destinationColumnId].cards.splice(destinationIndex, 0, movedCard)
            localStorage.setItem('columns', JSON.stringify(state.columns))
        },
        deleteColumn: (state, action) => {
            const { columnId } = action.payload
            delete state.columns[columnId]
            localStorage.setItem('columns', JSON.stringify(state.columns))
        }
    }
})


export const { addColumn, addCard, updateCard, deleteCard, moveCard, deleteColumn } = boardSlice.actions


export default boardSlice.reducer