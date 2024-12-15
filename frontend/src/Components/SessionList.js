import React, { useState, useEffect } from 'react';
import { getAllSessions, deleteSession, getSessionById, updateSessionName } from '../Services/sessionService';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../reducers/sessionSlice';
import { Box, TextField, IconButton, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { setTemplate, setSessionId } from '../reducers/templateSlice';
import { toast } from 'react-toastify';

const SessionList = () => {
  const user = useSelector((state) => state.auth.user);
  const sessions = useSelector((state) => state.session.sessionList);
  const sessionId = useSelector((state) => state.template.sessionId);

  const dispatch = useDispatch();

  const [editingSession, setEditingSession] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

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

  useEffect(() => {
    setSelectedSession(sessionId);
  }, [sessionId]);

  const handleEdit = (session) => {
    setEditingSession(session._id);
    setEditedName(session.name);
  };
  const newSession = ()=>{
    setSelectedSession(null)
    dispatch(setTemplate(""));
    dispatch(setSessionId(null));
    toast.success("Start Your New Session! ")
  }

  const handleSave = () => {
    if (!editedName.trim()) {
      toast.error("Session name cannot be empty");
      return;
    }
    updateSessionName(editingSession, editedName, user)
      .then(() => {
        toast.success("Session name updated successfully");
        setEditingSession(null);
        setEditedName('');
        getAllSessions(user)
          .then((res) => {
            dispatch(setSession(res.res));
          })
          .catch(() => {
            toast.error("Error fetching updated sessions");
          });
      })
      .catch(() => {
        toast.error("Error updating session name");
      });
  };

  const handleDiscard = () => {
    setEditingSession(null);
    setEditedName('');
  };

  const handleDelete = (id) => {
    deleteSession(id, user)
      .then(() => {
        toast.success("Session Deleted Successfully");
        dispatch(setTemplate(""));
        dispatch(setSessionId(null));
        getAllSessions(user)
          .then((res) => {
            dispatch(setSession(res.res));
          })
          .catch(() => {
            toast.error("Error fetching sessions after deletion");
          });
      })
      .catch(() => {
        toast.error("Error Deleting Session");
      });
  };

  const handleSelectSession = (sessionId) => {
    getSessionById(sessionId, user)
      .then((res) => {
        console.log(res);
        dispatch(setTemplate(res.res.code));
        dispatch(setSessionId(res.res.sessionId));
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedSession(sessionId);
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: '#F0EAE8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{ p: 3, flex: 1 }}
        variant="h4"
        gutterBottom
        color="#34312D"
        textAlign="center"
      >
        Session List
      </Typography>

      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#AF5D63',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#C26E74',
            },
            borderRadius: 2,
            boxShadow: 3,
          }}
          onClick={() => newSession()}
        >
          Create New Session
        </Button>
      </Box>
           
      <div style={{ height: '80%'}}>
      {sessions.length > 0 ? (
        <List
          sx={{
            overflow: 'auto',
            flex: 10,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {sessions.map((session) => (
            <ListItem
              key={session._id}
              onClick={() => handleSelectSession(session._id)}
              sx={{
                backgroundColor: selectedSession === session._id ? '#AF5D63' : '#FFFFFF',
                color: selectedSession === session._id ? '#FFFFFF' : '#34312D',
                borderRadius: 2,
                boxShadow: 3,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: selectedSession === session._id ? '#C26E74' : '#F5F0EE',
                },
                transition: 'background-color 0.3s, color 0.3s',
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
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: selectedSession === session._id ? '#F0EAE8' : '#AF5D63',
                          borderWidth: 1.5,
                        },
                        '&:hover fieldset': {
                          borderColor: selectedSession === session._id ? '#FFFFFF' : '#C26E74',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: selectedSession === session._id ? '#FFFFFF' : '#AF5D63',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: selectedSession === session._id ? '#FFFFFF' : '#34312D',
                        backgroundColor: selectedSession === session._id
                          ? 'rgba(240, 234, 232, 0.2)'
                          : '#FFFFFF',
                      },
                      '& .MuiInputLabel-root': {
                        color: selectedSession === session._id ? '#F0EAE8' : '#34312D',
                        '&.Mui-focused': {
                          color: selectedSession === session._id ? '#FFFFFF' : '#AF5D63',
                        },
                      },
                    }}
                    variant="outlined"
                    size="small"
                    label="Edit Session Name"
                  />

                  <Box>
                    <IconButton
                      onClick={handleSave}
                      sx={{
                        mr: 1,
                        color: selectedSession === session._id ? '#F0EAE8' : '#34312D',
                        '&:hover': {
                          backgroundColor: selectedSession === session._id
                            ? 'rgba(240, 234, 232, 0.2)'
                            : 'rgba(52, 49, 45, 0.1)',
                        },
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleDiscard}
                      sx={{
                        color: selectedSession === session._id ? '#F0EAE8' : '#AF5D63',
                        '&:hover': {
                          backgroundColor: selectedSession === session._id
                            ? 'rgba(240, 234, 232, 0.2)'
                            : 'rgba(175, 93, 99, 0.1)',
                        },
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <ListItemText primary={session.name} sx={{ flex: 1 }} />
                  <Box>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(session);
                      }}
                      sx={{
                        mr: 1,
                        color: selectedSession === session._id ? '#F0EAE8' : '#34312D',
                        '&:hover': {
                          backgroundColor: selectedSession === session._id
                            ? 'rgba(240, 234, 232, 0.2)'
                            : 'rgba(52, 49, 45, 0.1)',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(session._id);
                      }}
                      sx={{
                        color: selectedSession === session._id ? '#F0EAE8' : '#AF5D63',
                        '&:hover': {
                          backgroundColor: selectedSession === session._id
                            ? 'rgba(240, 234, 232, 0.2)'
                            : 'rgba(175, 93, 99, 0.1)',
                        },
                      }}
                    >
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
      </div>
    </Box>
    
  );
};

export default SessionList;
