import React, { useState, useRef } from "react";
import shortid from "shortid";
import styled from "styled-components";

import Container from "../Components/Container";
import Table from "../Components/Table";
import Loading from "../Components/Loading";
import ErrorBoundary from "../Utils/ErrorBoundary";
import useSpotifySearch from "../Utils/useSpotifySearch";

const StyledWrap = styled(Container)`
  padding: 20px 0;
  background-color: ${({ theme }) => theme};
  transition: background-color 0.3s ease-in-out;
`;

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

const MusicTable = ({ resource }) => {
  const data = resource.read();
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
  );
};

const MusicPage = () => {
  const [search, setSearch] = useState("");
  const [resource, isPending] = useSpotifySearch(search);

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      const ref = inputRef.current;
      if (ref) {
        setSearch(ref.value);
      }
    }
  };

  return (
    <StyledWrap theme={isPending ? "#f9f9f9" : "white"}>
      <Container>
        <section>
          <h2>Music</h2>
          {search && (
            <ResultsPrompt>
              {resource && isPending ? (
                <Loading width="100" />
              ) : (
                <p>
                  Results for: <b>{search}</b>
                </p>
              )}
            </ResultsPrompt>
          )}
          <StyledInputContainer>
            <label>
              <span>Search Spotify</span>
              <input ref={inputRef} onKeyDown={onKeyDown} type="search" />
            </label>
          </StyledInputContainer>
          {resource && (
            <ErrorBoundary>
              <React.Suspense
                fallback={
                  <div>
                    <Loading />
                    <div>...Loading</div>
                  </div>
                }
              >
                <MusicTable resource={resource} />
              </React.Suspense>
            </ErrorBoundary>
          )}
        </section>
      </Container>
    </StyledWrap>
  );
};

export default MusicPage;
