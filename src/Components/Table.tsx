import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  tr {
    border-bottom: 1px solid #ccc;
  }
  th,
  td {
    text-align: left;
    padding: 4px;
    min-width: 150px;
  }
`;

export default StyledTable;
