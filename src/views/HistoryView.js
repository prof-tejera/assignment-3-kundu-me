import React from "react";
import styled from "styled-components";

import HistoryComponent from "../components/history/HistoryComponent";

import Loading from "../components/generic/Loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can History your components by using the HistoryComponent component
 */
const HistoryView = () => {
  return (
    <Container>
      <div>
        <Title>Workout History</Title>
        <HistoryComponent
          title="Workout History"
          component={<Loading />}
          propDocs = {
            localStorage.getItem('nkunduapp-timers-history') ? JSON.parse(localStorage.getItem('nkunduapp-timers-history')) : []
          }
        />
      </div>
    </Container>
  );
};

export default HistoryView;
