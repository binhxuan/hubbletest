import React, {useState, useEffect } from 'react'

import {  Modal, Panel, List  } from 'rsuite';

import axios from 'axios'

import './modalDetail.scss'


const ModalDetail = (props) => {

    const { modalDetail, setModalDetail, idDetail, allIssues, setIdDetail } = props

    const [comments, setComments] = useState([])

    useEffect(() => {
       
            let tmpcomments = []
            tmpcomments.push({
                user:allIssues[idDetail].user.login, 
                body: allIssues[idDetail].body,
                updated: allIssues[idDetail].updated_at
            }
                )
            axios({
                method: 'GET',
                url: allIssues[idDetail].comments_url,
              headers: {
                'Content-Type': 'application/json',
              }
              })
                .then((res) => {
                  res.data.map((itm,idx) => {
                    tmpcomments.push({
                        user:itm.user.login, 
                        body: itm.body,
                        updated: itm.updated_at
                    })
                  })
                  setComments(tmpcomments)
                })
                .catch((err) => {
                  console.log(err)
                })
    
    }, [])

    return (
        <div>
        <Modal open={modalDetail} size="md" onClose={() => {
            setModalDetail(false) 
            setIdDetail('')
        }}>
          <Modal.Header>
            <Modal.Title>
                <div>
                    <div><h4>{allIssues[idDetail].title} #{allIssues[idDetail].number}</h4></div>
                    <div className="issueinfo">
                        {allIssues[idDetail].state === 'open' ? (<span className="state open">{allIssues[idDetail].state}</span>) : (<span className="state close">{allIssues[idDetail].state}</span>)}
                        <span className="info">{allIssues[idDetail].user.login + ' opened on ' + new Date(allIssues[idDetail].created_at).toLocaleDateString('en-EN')}</span>
                        <span className="comments">{allIssues[idDetail].comments + ' comments'}</span>
                        </div>
                </div>
                </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {comments.map((item, index) => (
          <Panel key={index} className="issuecomment" header={item.user + ' commented on ' + new Date(item.updated).toLocaleDateString('en-EN')} bordered>
            <List size="lg">
                <List.Item key={index} index={index}>
                    {item.body}
                </List.Item>     
            </List>
        </Panel>
     ))}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        </div>
    )
}

export default ModalDetail