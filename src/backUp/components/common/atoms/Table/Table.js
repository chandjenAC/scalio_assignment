import styled from "styled-components";

const generateTitles = (title) => {
  let initialBlock = `td {
          display: block;
          text-align: left;
          padding: 12px;
          position: relative;
    
          &:before {
            content: "${title[0]}";
            font-weight: 500;
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
          }
      `;
  let addNewBlock;
  for (let i = 1; i < title.length; i++) {
    addNewBlock = `&:nth-of-type(${i + 1}) {
              &:before {
                content: "${title[i]}";
              }
            }`;
    initialBlock = initialBlock + addNewBlock;
  }

  return initialBlock;
};

const Table = styled.table.attrs((props) => ({
  // we can define static props
  // background: "someColor",
  // or we can define dynamic ones
  //margin: props.margin || "1em",
}))`
  font-size: 13px;
  width: ${(props) => (props.width ? props.width : "auto")};
  border-collapse: seperate;
  border-spacing: 0 8px;
  border: none;
  pointer-events: auto;
  td,
  th {
    padding: 6px 6px 6px 0px;
  }

  td {
    padding: 5px 10px;
  }

  tbody tr {
    background-color: #f8f8f8;
    :hover {
      background-color: #ffffff;
      box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.39);
    }
  }
  thead {
    color: #9ba2b3;
    font-family: LatoSemiBold;
  }
`;

export default Table;

// caption-side: bottom;

// caption {
//   font-size: 0.9em;
//   padding: 5px;
//   font-weight: bold;
// }

// @media (max-width: 2000px) {
//   thead {
//     display: none;
//   }

//   tr {
//     padding: 0 0 15px;
//     display: block;
//   }
//   ${(props) => generateTitles(props.title)}
// }
