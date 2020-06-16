import React, { useState, useRef } from "react";
import shortid from "shortid";
import styled from "styled-components";

import Container from "../Components/Container";
import Table from "../Components/Table";
import { getSongsData } from "../api";

const StyledInputContainer = styled.div`
  label {
    display: block;
    width 100%;
    margin-bottom: 20px;
  }
  span {
    margin-right: 10px;
  }
`;

const ResultsPrompt = styled.div`
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 0;
`;

/**
 * Search -> Loading -> Display Resul
 **/

const MusicPage = (): React.FC => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(inputRef.current.value);
      getSongsData(inputRef.current.value).then((d) => setData(d));
    }
  };
  return (
    <Container>
      <section>
        <h2>Music</h2>
        {search && (
          <ResultsPrompt>
            Results for: <b>{search}</b>
          </ResultsPrompt>
        )}
        <StyledInputContainer>
          <label>
            <span>Search Artist</span>
            <input ref={inputRef} onKeyDown={onKeyDown} type="search" />
          </label>
        </StyledInputContainer>
        <Table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Song</th>
              <th>Url</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ artist, song, url }) => (
              <tr key={shortid.generate()}>
                <td>{artist}</td>
                <td>{song}</td>
                <td>
                  <a href={url}>{url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default MusicPage;
