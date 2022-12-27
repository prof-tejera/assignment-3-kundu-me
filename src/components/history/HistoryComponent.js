import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #121212;
  margin: 20px 0px;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 1.3rem;
`;

const RenderComponent = styled.div`
  padding: 25px;
  display: flex;
  align-items: center;
`;

const History = styled.table``;

const HistoryComponent = ({ title, component, propDocs }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
        <RenderComponent>{component}</RenderComponent>
        <History>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Total Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            {propDocs.map((doc, index) => {
              return (
                <tr key={index}>
                  <td>{doc.datetime}</td>
                  <td>{doc.description}</td>
                  <td>{doc.totaltime}</td>
                </tr>
              );
            })}
          </tbody>
        </History>
      </Container>
    </Wrapper>
  );
};

export default HistoryComponent;
