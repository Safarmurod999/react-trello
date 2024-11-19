import React from 'react'
import Layout from '../../components/Layout'
import KanbanBoard from '../../components/KanbanBoard'

const Home = () => {
    return (
        <Layout>
            <div className="min-h-full">
                <header className="bg-dark-pink shadow">
                    <div className=" bg-[#6d304d]">
                        <h1 className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 text-xl font-bold tracking-tight text-white">Safarmurod</h1>
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