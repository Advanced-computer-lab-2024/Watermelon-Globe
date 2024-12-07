import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import './HomeScreen.css';
import ActivityForm from '../Components/ActivityForm';
import Navbar from '../Components/AdvertiserNavbar';
import Widget from '../Components/widget/Widget';
import Featured from "../Components/featured/Featured";
import Chart from "../Components/chart/Chart";
import Table from '../Components/table/Table';
import AccountPage from './AccountPage/AccountPage';
import SalesReportPage from '../Components/salesReport/SalesReport';

const HomeScreen = () => {
    const [activities, setActivities] = useState([]);
    const [advertiser, setAdvertiser] = useState(null);
    const [selectedTab, setSelectedTab] = useState('Dashboard'); // 'all' or 'my'

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdvertiser = async () => {
            try {
                const response = await axios.get('/api/Advertiser/lastApprovedAdvertiser');
                setAdvertiser(response.data);
            } catch (error) {
                console.error('Error fetching advertiser profile:', error);
            }
        };

        const fetchActivities = async () => {
            try {
                const activities = await axios.get('/api/Activities/activities');
                console.log(activities);
                setActivities(activities.data);
            } catch (error) {
                console.error('Error fetching activities', error);
            }
        };

        fetchAdvertiser();
        fetchActivities();
    }, []);

    const filteredActivities =
        selectedTab === 'my'
            ? activities.filter(activity => activity.Advertiser?._id === advertiser?._id)
            : activities;

    return (
        <div className="home">
            <Sidebar
                    advertiser={advertiser}
                    advertiserName = {advertiser?.Name}
                    advertiserId={advertiser?._id}
                    onCreateActivity={() => navigate(`/add-activity/${advertiser?._id}`)}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
            />
            <div className="homeContainer">
                <Navbar 
                    advertiser={advertiser}
                    advertiserId={advertiser?._id}
                />
                
                <div className="main-content">
                    {selectedTab === 'addActivity' ? (
                        <div className='full-width-form'>
                            <ActivityForm userId={advertiser?._id} />
                        </div>
                    ) : selectedTab === 'Dashboard' ? (
                        <>
                                <div className="widgets">
                                    <Widget type="user" />
                                    <Widget type="order" />
                                    <Widget type="earning" />
                                    <Widget type="balance" />
                                </div>
                                <div className="charts">
                                    <Featured />
                                    <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
                                </div>
                                <div className="listContainer">
                                    <div className="listTitle">Latest Transactions</div>
                                    <Table />
                                </div>
                          </>
                        ) : selectedTab === "Account" ? (
                           <>
                                <AccountPage advertiserId={advertiser?._id}/>
                           </> 
                        ): selectedTab === "salesReport"? (
                            <SalesReportPage advertiserId={advertiser?._id}/>
                        ):(
                        <>
                            <h1>Activities</h1>
                            <div className="activity-grid">
                                {filteredActivities.map(activity => (
                                    <div
                                        key={activity._id}
                                        className="activity-card"
                                        onClick={() => {
                                            navigate(`/activityDetails/${activity._id}/${advertiser._id}`);
                                        }}
                                    >
                                        <h3><strong>{activity.Name}</strong></h3>
                                        <p><strong>Date:</strong> {new Date(activity.Date).toLocaleDateString()}</p>
                                        <p><strong>Location:</strong> {activity.Location.coordinates.join(', ')}</p>
                                        <p><strong>Price:</strong> ${activity.Price}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
