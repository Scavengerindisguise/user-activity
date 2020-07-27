import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';


function getFilteredDates(dates, todayDate) {
    let userActivityDates = dates.map(item => {
        let startDate = item.start_time.split(' ');
        let endDate = item.end_time.split(' ')
        let startTimeLength = startDate[3].length;
        let endTimeLength = endDate[3].length;
        startTimeLength = startDate[3].slice(0, startTimeLength - 2);
        endTimeLength = endDate[3].slice(0, endTimeLength - 2);
        startDate = startDate[2] + '-' + startDate[0] + '-' + startDate[1] + ' ' + startTimeLength;
        endDate = endDate[2] + '-' + endDate[0] + '-' + endDate[1] + ' ' + endTimeLength;
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        return { startDate, endDate };
    });
    console.log(userActivityDates);
    userActivityDates = userActivityDates.filter(item => {
        console.log(moment(item.startDate).format('DD-MM-YYYY'));
        console.log(moment(todayDate).format('DD-MM-YYYY'));
        if (moment(item.startDate).format('DD-MM-YYYY') === moment(todayDate).format('DD-MM-YYYY'))
            return item;
        else
            return null;
    });
    console.log(userActivityDates);
    return userActivityDates;
}

function GetTableBody({ todayDate, activityDates }) {
    //   console.log(todayDate,activityDates);
    const currentActivityDates = getFilteredDates(activityDates, todayDate);
    console.log(currentActivityDates);
    if (currentActivityDates.length === 0)
        return (
            <tr>
                <td className='text-center' colSpan='2'>No results to display</td>
            </tr>
        ); else
        return currentActivityDates.map((item) => {
            return (
                <>
                    <tr key={item.startDate}>
                        <td>{moment(item.startDate).format('MMMM Do YYYY, h:mm:ss')}</td>
                        <td>{moment(item.endDate).format('MMMM Do YYYY, h:mm:ss')}</td>
                    </tr>
                </>
            )
        }
        )
}


const ModalComponent = (props) => {
    console.log(props);
    return (
        <Modal size='lg' isOpen={props.isModalOpen} toggle={() => props.toggle(props.currentUser)}>
            <ModalHeader toggle={() => props.toggle(props.currentUser)}>User Activity</ModalHeader>
            <ModalBody>
                <div className='row'>
                    <div className='col-sm-6'>
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <GetTableBody todayDate={props.todayDate} activityDates={props.currentUser['activity_periods']} />
                            </tbody>
                        </table>
                    </div>
                    <div className='col-sm-6'>
                        <Calendar value={props.todayDate} onChange={props.onChange} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" size='sm' onClick={() => props.toggle(props.currentUser)}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalComponent;