import { createTheme } from '@mui/material/styles';

const getTheme=(mode)=>{
return createTheme({
    palette: {
        mode: mode,
    }

})
}
export default getTheme;

            