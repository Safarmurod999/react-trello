import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/KanbanBoard'

const Home = () => {
    return (
        <Layout>
            <div className="min-h-full">
                <header className="bg-dark-pink shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Kanban Board</h1>
                    </div>
                </header>
                <main className='bg-dark-pink min-h-[80vh]'>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-[80vh]">
                        <KanbanBoard />
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default Home