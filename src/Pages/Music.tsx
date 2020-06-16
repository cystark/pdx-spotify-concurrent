import React, { useState, useRef, unstable_useTransition } from "react";
import shortid from "shortid";
import styled from "styled-components";

import Container from "../Components/Container";
import Table from "../Components/Table";
import Loading from "../Components/Loading";

import { getSongsData } from "../api";
import ErrorBoundary from "../Utils/ErrorBoundary";
import createResource from "../Utils/createResource";

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

type createResourceProp = {
  read: () => void;
};

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
  const [resource, setResource] = useState<createResourceProp | null>(null);
  const [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 4000,
  });
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      const ref = inputRef.current;
      if (ref) {
        setSearch(ref.value);
        startTransition(() => {
          setResource(createResource(() => getSongsData(ref.value)));
        });
      }
    }
  };

  return (
    <Container>
      <section>
        <h2>Music</h2>
        {search && (
          <ResultsPrompt>
            {isPending ? (
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
            <span>Search Artist</span>
            <input ref={inputRef} onKeyDown={onKeyDown} type="search" />
          </label>
        </StyledInputContainer>
        {resource && (
          <ErrorBoundary>
            <React.Suspense fallback={<Loading />}>
              <MusicTable resource={resource} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </section>
    </Container>
  );
};

export default MusicPage;
