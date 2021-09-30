import React, {useState} from 'react'

import { Container, Header, Content, Footer, Sidebar, Sidenav } from 'rsuite';

import './container.scss'

import TableCon from '../Table/table'

const headerStyles = {
    padding: 20,
    fontSize: 16,
    backgroundColor: 'rgb(0, 140, 132)',
    color: ' #fff'
  };

const ContainerCon = () => {
    const [page, setPage] = useState()
    return (
        <div>
            <div className="show-container">
            <Container>
            <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            collapsible
          >
            <Sidenav appearance="subtle" onSelect={(e) => {
                setPage(e)
            }}>
              <Sidenav.Header>
                <div style={headerStyles}>Hubble Test Challenge</div>
              </Sidenav.Header>
            </Sidenav>
          </Sidebar>

          <Container>
            <Header>
              <h3>Github issues list</h3>
            </Header>
            <Content>
                <TableCon />
            </Content>
            <Footer>@Copyright 2021 Binh Xuan Nguyen</Footer>
          </Container>
    </Container>
            </div>      
        </div>
    )
}

export default ContainerCon