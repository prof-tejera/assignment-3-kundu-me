import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

import DisplayTotalTime from "../components/generic/DisplayTotalTime";
import DisplayTime from "../components/generic/DisplayTime";
import TextInput from "../components/generic/TextInput";
import Button from "../components/generic/Button";
import Numbers from "../components/generic/Numbers";
import Controls from "../components/generic/Controls";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            }
          ]}
        />
        <DocumentComponent
          title="Stopwatch "
          component={<Stopwatch controls={true} index={9999}/>}
          propDocs={[
            {
              prop: "controls",
              description: "Allow/Disallow individual control",
              type: "boolen",
              defaultValue: "true",
            },
            {
              prop: "index",
              description: "index of the Timer",
              type: "integer",
              defaultValue: "0",
            }
          ]}
        />
        <DocumentComponent
          title="Countdown "
          component={<Countdown controls={true} index={9999}/>}
          propDocs={[
            {
              prop: "controls",
              description: "Allow/Disallow individual control",
              type: "boolen",
              defaultValue: "true",
            },
            {
              prop: "index",
              description: "index of the Timer",
              type: "integer",
              defaultValue: "0",
            }
          ]}
        />
        <DocumentComponent
          title="XY "
          component={<XY controls={true} index={9999}/>}
          propDocs={[
            {
              prop: "controls",
              description: "Allow/Disallow individual control",
              type: "boolen",
              defaultValue: "true",
            },
            {
              prop: "index",
              description: "index of the Timer",
              type: "integer",
              defaultValue: "0",
            }
          ]}
        />

        <DocumentComponent
          title="Tabata"
          component={<Tabata controls={true} index={9999}/>}
          propDocs={[
            {
              prop: "controls",
              description: "Allow/Disallow individual control",
              type: "boolen",
              defaultValue: "true",
            },
            {
              prop: "index",
              description: "index of the Timer",
              type: "integer",
              defaultValue: "0",
            }
          ]}
        />

        <DocumentComponent
          title="DisplayTime"
          component={<DisplayTime milliseconds={100} uservalue={1000}></DisplayTime>}
          propDocs={[
            {
              prop: "milliseconds",
              description: "current milliseconds",
              type: "integer",
              defaultValue: "0",
            },
            {
              prop: "uservalue",
              description: "user defined value milliseconds",
              type: "integer",
              defaultValue: "0",
            }
          ]}
        />

        <DocumentComponent
          title="DisplayTotalTime"
          component={<DisplayTotalTime milliseconds={1000}></DisplayTotalTime>}
          propDocs={[
            {
              prop: "milliseconds",
              description: "current milliseconds",
              type: "integer",
              defaultValue: "0",
            }
          ]}
        />

        <DocumentComponent
          title="TextInput"
          component={<TextInput value={'test doc'} onChange={'onChange'}/>}
          propDocs={[
            {
              prop: "value",
              description: "value",
              type: "string",
              defaultValue: "",
            },
            {
              prop: "onChange",
              description: "onChange function",
              type: "function",
              defaultValue: "",
            }
          ]}
        />

        <DocumentComponent
          title="Numbers"
          component={<div style={{ display: "flex"}}>
              <Numbers onClick={'handleNumberClick'} />
            </div>}
          propDocs={[
            {
              prop: "onClick",
              description: "onClick function",
              type: "function",
              defaultValue: "",
            }
          ]}
        />

        <DocumentComponent
          title="Controls"
          component={<div style={{ display: "flex"}}>
              <Controls onClick={'handleTabataClick'} valueStart="Start" valuePause={'Pause'} valueStop="Stop" valueReset="Reset"/>
            </div>}
          propDocs={[
            {
              prop: "onClick",
              description: "onClick function",
              type: "function",
              defaultValue: "",
            }
          ]}
        />

        <DocumentComponent
          title="Button"
          component={<div style={{ display: "flex"}}>
            <Button displayName="Countdown" value="Button" className={'inputTypeClassName'} onClick={'handleInputTypeClick'} />            </div>}
          propDocs={[
            {
              prop: "onClick",
              description: "onClick function",
              type: "function",
              defaultValue: "",
            }
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
