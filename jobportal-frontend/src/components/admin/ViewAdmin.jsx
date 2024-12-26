import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';

export const ViewAdmin = () => {
  const [admins, setAdmins] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/list'); // Replace with your actual API endpoint
        setAdmins(response.data); // Assuming response.data is an array of admins
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleRemoveAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/${id}`); // Replace with actual delete endpoint
      setAdmins(admins.filter((admin) => admin.id !== id)); // Remove the admin from the state
    } catch (error) {
      console.error("Error removing admin:", error);
    }
  };

  return (
    <TableContainer style={{ width: "76vw" }}>
      <Table style={{ border: '1px solid #ccc', marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold' }}>Admin ID</TableCell>
            <TableCell style={{ border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold' }}>Username</TableCell>
            {/* <TableCell style={{ border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold' }}>Role</TableCell>
            <TableCell style={{ border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold' }}>Status</TableCell> */}
            <TableCell style={{ border: '1px solid #ccc', textAlign: 'center', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell style={{ border: '1px solid #ccc', textAlign: 'center' }}>{admin.id}</TableCell>
                <TableCell style={{ border: '1px solid #ccc', textAlign: 'center' }}>{admin.username}</TableCell>
                {/* <TableCell style={{ border: '1px solid #ccc', textAlign: 'center' }}>{admin.role}</TableCell>
                <TableCell style={{ border: '1px solid #ccc', textAlign: 'center' }}>{admin.status}</TableCell> */}
                <TableCell style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  <Button variant="contained" style={{ backgroundColor: "#42A5F5", color: "white" }} onClick={() => handleRemoveAdmin(admin.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: 'center' }}>No admins available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
