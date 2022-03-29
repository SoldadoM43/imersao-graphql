import { DialogContent, Paper } from "@material-ui/core";
import styled from 'styled-components';

export const ContentBox = styled(Paper).attrs({elevation: 3})`
    padding: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        width: 82px;
        height: 82px;
        object-fit: cover;
        margin-right: 8px;
    }
`

export const ModalDetails = styled(DialogContent)`
    img {
        width: 256px;
        height: 256px;
        object-fit: cover;
    }

    div {
        background-color: #dedede;
        border-radius: 16px;
        padding: 8px 16px;
    }
`