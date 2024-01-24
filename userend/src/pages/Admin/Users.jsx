import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice"
import { Button, message, Table } from "antd"
import moment from "moment"
import { ChangeUserStatus, FetchAllUsers } from '../../apicall/users';


function Users() {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await FetchAllUsers();
            dispatch(SetLoader(false));
            if (response.success) {
                setUsers(response.data)
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    }

    const onStatusChange = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            const response = await ChangeUserStatus(id, status);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                fetchData();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false))
            message.error(error.message)
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => {
                return record.role.toUpperCase();
            }
        },
        
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase();
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record;
                return (
                    <div className="flex gap-5">
                        {
                            status === "active" && <span className='underline cursor-pointer'
                                onClick={() => onStatusChange(_id, "blocked")}>Block</span>
                        }
                        {
                            status === "blocked" && <span className='underline cursor-pointer'
                                onClick={() => onStatusChange(_id, "active")}>Unblock</span>
                        }
                    </div>
                )
            }
        },
        {
            title: "CreatedAt",
            dataIndex: "CreatedAt",
            render: (data, record) => moment(record.createAt).format("DD/MM/YYYY hh:mm:ss A")
        },

    ];

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <Table columns={columns} dataSource={users} />
        </div>
    )
}

export default Users;
