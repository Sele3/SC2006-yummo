import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import NavBar from '../navbar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './myreservations.css';

export default function MyReservations() {
    const [reservation, setReservations] = useState([]);
    const [trivia, setTrivia] = useState('Yummo is a restaurant reservation app that allows you to search for restaurants near you and make reservations.');

    const url = 'http://127.0.0.1:8000/api/restaurants/reservations';
    const token = localStorage.getItem('authToken');
    useEffect(() => {
        axios.get(url, {
            headers: {
                'Authorization': `Token ${token}`,
            },
            })
            .then(res => {
                if (res.data) {
                    setReservations(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const triviaurl = 'https://api.api-ninjas.com/v1/trivia?category=fooddrink';
    const triviatoken = process.env.REACT_APP_APININJA_API_KEY;
    useEffect(() => {
        axios.get(triviaurl, {
            headers: { 
                'X-Api-Key': '',
            }}
            )
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setTrivia(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const formatDate = (value) => {
        const d1 = new Date(value);
        return d1.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    const formatTime = (value) => {
        const t1 = new Date(value);
        return t1.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const imageBodyTemplate = (reservation) => {
        return <img src={'http://localhost:8000'+reservation.restaurant.img} alt={reservation.restaurant.img} className="w-6rem shadow-2 border-round" />;
    };

    const dateBodyTemplate = (reservation) => {
        return formatDate(reservation.reserved_at);
    };

    const timeBodyTemplate = (reservation) => {
        return formatTime(reservation.reserved_at);
    };

    const statusBodyTemplate = (reservation) => {
        return <Tag value={getValue(reservation)} severity={getSeverity(getValue(reservation))}></Tag>;
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'Upcoming':
                return 'success';
            case 'Past':
                return 'danger';
            default:
                return null;
        }
    };

    const getValue = (reservation) => {
        const d1 = new Date(reservation.reserved_at);
        const datenow = new Date();
        return d1>datenow? "Upcoming" : "Past";
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">My Reservations</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
    const footer = `In total there are ${reservation ? reservation.length : 0} reservations.`;

    return (
        <>
        <NavBar />
        <div className="card-container">
            <div className="card">
                <DataTable value={reservation} header={header} footer={footer} stripedRows  paginator rows={4} rowsPerPageOptions={[3, 6, 9, 12]} tableStyle={{ minWidth: "60rem"}}>
                    <Column field="restaurant.name" header="Name"></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="pax" header="Pax"></Column>
                    <Column field="reserved_at" header="Date" body={dateBodyTemplate}></Column>
                    <Column field="reserved_at" header="Time" body={timeBodyTemplate}></Column>
                    <Column header="Status" body={statusBodyTemplate}></Column>
                </DataTable>
            </div>
            <div className="trivia-container">
                <div className="card2">
                    <div className="card2-header">
                        <span>Did you </span>
                        <span style={{color: "#ffd600"}}>know</span>
                    </div>
                    <div className="card2-body">
                        <h2>{trivia[0].question}</h2>
                        <h1>{trivia[0].answer}</h1>
                    </div>
                </div>               
                <img src="birdie-pic.png" alt="birdie" className="birdie-pic"/>
            </div>
        </div>
        </>
    );
}
        