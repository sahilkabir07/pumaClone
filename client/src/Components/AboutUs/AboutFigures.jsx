import React from 'react'

const AboutFigures = () => {
    return (
        <div className='mt-24'>
            <p className='ml-12 font-semibold text-6xl text-gray-800 hover:text-red-400'>
                PUMA IN FIGURES
            </p>
            <div className='flex flex-wrap justify-center gap-8 p-12'>
                <div className='flex flex-col items-center'>
                    <p className='text-6xl font-bold text-gray-800 hover:text-blue-400'>
                        8.602
                    </p>
                    <p className='text-xl font-bold text-gray-800 hover:text-blue-400'>
                        BILLION EURO SALES IN 2023
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-6xl font-bold text-gray-800 hover:text-blue-400'>
                        622
                    </p>
                    <p className='text-xl font-bold text-gray-800 hover:text-blue-400'>
                        MILLION EUROS EBIT IN 2023
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-6xl font-bold text-gray-800 hover:text-blue-400'>
                        &asymp;21,000
                    </p>
                    <p className='text-xl font-bold text-gray-800 hover:text-blue-400'>
                        EMPLOYEES
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-6xl font-bold text-gray-800 hover:text-blue-400'>
                        1948
                    </p>
                    <p className='text-xl font-bold text-gray-800 hover:text-blue-400'>
                        FOUNDING YEAR
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutFigures
