import React, { useState, useEffect } from 'react';
import { getAllSessions, updateSession } from '../Services/sessionService';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../reducers/sessionSlice';
import { Box, Button, TextField, IconButton, List, ListItem, ListItemText, Typography, Grid, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const SessionList = () => {
  const user = useSelector((state) => state.auth.user);
  const sessions = useSelector((state) => state.session.sessionList);
  const sessionId = useSelector((state) => state.template.sessionId);

  const dispatch = useDispatch();

  const [editingSession, setEditingSession] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    if (user) {
      getAllSessions(user)
        .then((res) => {
          dispatch(setSession(res.res));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, dispatch, sessionId]);

  const handleEdit = (session) => {
    setEditingSession(session._id); // Use _id for uniqueness
    setEditedName(session.name); // Set the edited name to the current session's name
  };

  const handleSave = () => {
    updateSession(editingSession, { name: editedName })
      .then(() => {
        dispatch(setSession(sessions.map(session => 
          session._id === editingSession ? { ...session, name: editedName } : session
        )));
        setEditingSession(null);
        setEditedName('');
      })
      .catch((err) => {
        console.error('Error updating session:', err);
      });
  };

  const handleDiscard = () => {
    setEditingSession(null);
    setEditedName('');
  };

  const handleDelete = (id) => {
    console.log('Deleting session', id);
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',

        backgroundColor: '#DBD9DB',
        display: 'flex', 
        flexDirection: 'column'

      }}
    >
      <Typography sx = {{p:3, flex: 1}} variant="h4" gutterBottom color="#34312D" textAlign="center">
        Session List
      </Typography>
      {sessions.length > 0 ? (
        <List sx={{height:'80%',overflow:"auto",flex:10,paddingLeft:4,paddingRight:4, }} >
          {sessions.map((session) => (
            <ListItem

              key={session._id} // Use _id as the key
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 3,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              {editingSession === session._id ? (
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <TextField
                    fullWidth
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    sx={{
                      mr: 2,
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#34312D',
                      },
                    }}
                    variant="outlined"
                    size="small"
                    label="Edit Session Name"
                  />
                  <Box>
                    <IconButton onClick={handleSave} color="primary" sx={{ mr: 1 }}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleDiscard} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <ListItemText primary={session.name} sx={{ flex: 1 }} />
                  <Box>
                    <IconButton onClick={() => handleEdit(session)} sx={{ mr: 1, color: '#34312D' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(session._id)} sx={{ color: '#AF5D63' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary" align="center">
          No sessions available
        </Typography>
      )}
    </Box>
  );
};

export default SessionList;
