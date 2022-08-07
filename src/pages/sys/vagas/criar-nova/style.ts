import styled from "styled-components";

export const styledCriarNovaVaga = styled.div`
    
`;
export const CriarVagaFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 500px;
    .buttons-container{
        align-self: flex-end;
        margin-top: 20px;
    }
    .description-container{
        position: relative;
        display: flex;
        flex-direction: column;
        textarea{
            margin-bottom: 30px;
        }
        .counter-box{
            position: absolute;
            bottom: -5px;
            right: 10px;
            padding: 3px 5px;
            font-size: 13px;
            background-color: var(--accent-color-opacity);
            color: var(--accent-color);
            border-radius: 5px;
            user-select: none;
            pointer-events: none;
            &.danger{
                color: red;
            }
        }
    }
    @media(max-width: 700px){
        min-width: initial;
    }
`