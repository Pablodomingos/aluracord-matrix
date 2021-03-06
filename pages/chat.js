import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js';
import { createClient } from '@supabase/supabase-js';
import { Scrollbar } from 'react-scrollbars-custom';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxMTU2MywiZXhwIjoxOTU4ODg3NTYzfQ.Btb6cahF9nVS8dNOB-8w_sxffFjN3gPmh7jh8xVljRk';
const SUPABASE_URL = 'https://kwdgnjumpjdptwgfythd.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new)
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [chat, setChat] = React.useState([
        // {
        //     texto: ':sticker: https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif',
        //     de: 'PabloDomingos',
        //     id: 1
        // }
    ]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta', data);
                setChat(data);
            });

        escutaMensagensEmTempoReal((novaMensagem) => {
            // console.log(novaMensagem);
            //Quero reusar um valor de referencia (objeto/array)
            //Passar uma função pro setState

            setChat((valoAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valoAtualDaLista,
                ]
            });
        });
    }, []);

    // Sua lógica vai aqui
    function handleNovaMensagem(novaMensagem) {
        if (!(mensagem === '') || novaMensagem.startsWith(':sticker:')) {
            const mensagem = {
                texto: novaMensagem,
                de: usuarioLogado,
                // id: chat.length + 1,
            };

            supabaseClient
                .from('mensagens')
                .insert([
                    mensagem
                ])
                .then(({ data }) => {
                });

        }
        setMensagem('');
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <Scrollbar>
                        <MessageList mensagens={chat} />
                    </Scrollbar>
                    {/* {chat.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        );
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(evento) => {
                                const valor = evento.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(evento) => {
                                if (evento.key === 'Enter') {
                                    evento.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            onClick={(evento) => {
                                if (evento.type === 'click') {
                                    evento.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            variant='tertiary'
                            colorVariant='neutral'
                            label='Enter'
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                padding: '15px 15px',
                                maxWidth: '30%',
                                height: '80%',
                                marginBottom: '5px',
                            }}
                        />
                        <Box
                            styleSheet={{
                                marginLeft: '10px',
                            }}
                        >
                            {/*  CallBack */}
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    // console.log(sticker);
                                    handleNovaMensagem(`:sticker: ${sticker}`);
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props);
    // console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* condicional em REACT usando expreção ternária
                        Modo declarativo*/}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}
                        {/* {mensagem.texto} */}
                    </Text>
                );
            })}
        </Box>
    )
}