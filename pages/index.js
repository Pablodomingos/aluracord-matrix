import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

function Titulo(paramen) {
    // console.log(paramen);
    const Tag = paramen.tag || 'h1';
    return (
        <>
            <Tag>{paramen.children}</Tag>
            <style jsx> {`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['100']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}


// //Componente React
// function HomePage() {
//     //JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de Volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>


//             <style jsx>{`
//                 h2{
//                     // color: white;
//                 }
//             `}</style>

//         </div>
//     )
// }

// export default HomePage


//Componente React
export default function PaginaInicial() {
    //JSX
    // const username = 'PabloDomingos';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();

    let novaVariavelUser = '';
    if (username.length >= 3) {
        novaVariavelUser = username
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://image.freepik.com/vetores-gratis/floresta-de-savana-na-noite-escura_1308-14305.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 8px 20px 0 rgb(145 50 200 / 20%)',
                        backgroundImage: 'linear-gradient(225deg, #056C94 , #190A22 80%)',
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infoDoEvento) {
                            if (username != '') {
                                roteamento.push(`/chat?username=${username}`);
                                infoDoEvento.preventDefault();
                            } else {

                            }
                            // window.location.href = './chat';
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text 
                            variant="body3" 
                            styleSheet={{ 
                                marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] 
                            }}>
                            {appConfig.name}
                        </Text>

                        {/* <input 
                            type="text"
                            value={username}
                            onChange={function (evento) {
                                console.log(evento.target.value);
                                //Onde ta o valor?
                                const valor = evento.target.value;
                                //Trocar o valor da variável
                                // através do React e avisa quem precisa
                                setUsername(valor);
                            }}
                        /> */}
                        <TextField
                            type='text'
                            value={username}
                            onChange={function (evento) {
                                // console.log(evento.target.value.length);
                                //Onde ta o valor ?
                                const valor = evento.target.value;

                                /*
                                Lógica para só aparecer a imagem quando o username for no minimo 3 caracteres.
                                Mas foi substituida por uma condição que está na linha 54.
                                const tamanho = evento.target.value.length;
                                if (tamanho >= 3) {
                                    setTeste(valor);
                                } else {
                                    setTeste('');
                                }
                                */

                                //Troca o valor da variável
                                //através do React e avisa quem precisa
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                            transition: '0.2s',
                            hover: {
                                maxWidth: '250px',
                                backgroundColor: 'transparent',
                                border: 'none',
                            }
                        }}
                    >
                        <Image
                            name='imgUser'
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${novaVariavelUser}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {novaVariavelUser}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
