import {useState, useEffect} from 'react'

import { Table, SelectPicker } from 'rsuite';

import axios from 'axios'

import './table.scss'

import ModalDetail from '../Modal/modalDetail';

const { Column, HeaderCell, Cell  } = Table

const TableCon = () => {
    const [data, setData] = useState([])

    const [page, setPage] = useState(1)

    const [displayLength, setDisplayLength] = useState(10)

    const [showData, setShowData] = useState([])

    const [loading, setLoading] = useState(true)

    const [modalDetail, setModalDetail] = useState(false)

    const [idDetail, setIdDetail] = useState('')

    const [allIssues, setAllIssues] = useState({})

    const [stateFilter, setStateFilter] = useState('open')

    let selectstate = [{
        label: 'Open',
        value: 'open'
    },
    {
        label: 'Closed',
        value: 'closed'
    },
    {
        label: 'All',
        value: 'all'
    }]

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://api.github.com/repos/nnluukhtn/employment_bot/issues?state='+ stateFilter,
            data: {
                state: stateFilter
            }
          })
            .then((res) => {
              let tmpdatares = []
              let tmpdataobj = {}
              res.data.map((itm,idx) => {
                  tmpdatares.push({
                      id: itm.id,
                      author_association: itm.author_association,
                      body: itm.body,
                      title: itm.title,
                      labels: itm.labels,
                      state: itm.state,
                      number: itm.number
                  })
                  tmpdataobj[itm.id] = itm
              })
              let tmpdata = tmpdatares.filter((v,i) => {
                const start = displayLength * (page - 1);
                const end = start + displayLength;
                return i >= start && i < end;
              })

              setAllIssues(tmpdataobj)

              setData(res.data)
              setShowData(tmpdata) 
              setLoading(false)  
            })
            .catch((err) => {
              console.log(err)
            })
    }, [stateFilter,displayLength,page])

    useEffect(() => {
        if(idDetail !== '')
        {
            setModalDetail(true)
        }
    }, [idDetail])

    return (
        <>
       <div>
        <div className="newusercon">
          <div>
          Filter by state
          </div>
          <div className="statefilter">
          <SelectPicker 
            data={selectstate} 
            defaultValue={'open'} 
            cleanable={false}
            onChange={(val) => {
                setStateFilter(val)
                setLoading(true)
            }}
            />
          </div>
        </div>
        <div className="tablecon">
        <Table 
          loading={loading} 
          data={showData} 
          autoHeight
          bordered
          cellBordered
          onRowClick={(obj) => {
              setIdDetail(obj.id)
          }}
        >

          <Column flexGrow={1}>
            <HeaderCell>Title</HeaderCell>
            <Cell dataKey="title" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Description</HeaderCell>
            <Cell dataKey="body" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>State</HeaderCell>
            <Cell dataKey="state" />
          </Column>

        </Table>
        <div style={{ padding: 20 }}>
      </div>
        </div>      
        {modalDetail && <ModalDetail 
        modalDetail={modalDetail}
        setModalDetail={setModalDetail}
        idDetail={idDetail}
        allIssues={allIssues}
        setIdDetail={setIdDetail}
        />}
        
        </div>
        </>
    )
}

export default TableCon