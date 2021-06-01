import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  // we can define static props
  // background: "someColor",
  // or we can define dynamic ones
  //margin: props.margin || "1em",
}))`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : "LatoRegular"};
  line-height: 1;
  background: ${(props) => (props.background ? props.background : "none")};
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  margin: ${(props) => (props.margin ? props.margin : "0px 0px 0px 16px")};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "none"};
  color: black;
  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: darkgrey;
  }
`;
export default Input;
