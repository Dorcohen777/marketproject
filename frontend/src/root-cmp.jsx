import React from 'react'
import { Routes, Route } from 'react-router'

// cmp
import { HomePage } from './pages/home-page'

export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    <Route path='/' element={<HomePage/>} />
                </Routes>
            </main>
        </div>
    )
}


