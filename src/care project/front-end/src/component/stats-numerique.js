import React from 'react'

const StatsNumerique = ()=>(

    <table className={'statsNumerique'}>
        <tr>
            <td className={'td-right'}>Nombre de Patients</td>
            <td>115</td>
        </tr>
        <tr>
            <td className={'td-right'}>Nombre de Praticiens</td>
            <td>24</td>
        </tr>
        <tr >
            <td className={'td-right'}>Nombre total de Messages échangés</td>
            <td>178</td>
        </tr>
        <tr>
            <td className={'td-right'}>Nombre  Messages échangés par jour</td>
            <td>18</td>
        </tr>
        <tr>
            <td className={'td-right'}>Nombre de Patients Actifs</td>
            <td>88</td>
        </tr>
    </table>
)
export default StatsNumerique
