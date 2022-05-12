import React from 'react'

import jsonData from '../../../__OwnerData.json'

export const SavingsComponent = () => {
    const oldDyanmoDBData: Array<any> = jsonData;

    return (
        <>
            <div>SavingsComponent</div>
            <div>
                {JSON.stringify(oldDyanmoDBData)}
            </div>
        </>
    )
}
