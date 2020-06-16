import React, { useState, useRef } from "react";
import shortid from "shortid";
import styled from "styled-components";

import Container from "../Components/Container";
import Table from "../Components/Table";
import { getSongsData } from "../api";
import ErrorBoundary from "../Utils/ErrorBoundary";

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

let result;
let errors;
let spotifyPromise;
spotifyPromise = getSongsData("").then(
  (d) => (result = d),
  (e) => (errors = e)
);

const MusicPage = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      const ref = inputRef.current;
      if (ref) {
        setSearch(ref.value);
        // getSongsData(ref.value).then((d) => setData(d));
      }
    }
  };

  const MusicTable = () => {
    if (errors) {
      throw errors;
    }
    if (!result) {
      throw spotifyPromise;
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Song</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {result.map(({ artist, song, url }) => (
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
    );
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
        <ErrorBoundary>
          <React.Suspense fallback={<div>...Loading</div>}>
            <MusicTable />
          </React.Suspense>
        </ErrorBoundary>
      </section>
    </Container>
  );
};

export default MusicPage;
