import { Request, Response } from "express";
import Paciente from "../models/Paciente";

export const PostCriandoPaciente = async(req: Request, res: Response) => {
    const { nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente } = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente});

    try{

        const NovoPaciente = await Paciente.criandoPaciente({nome_paciente: 'Mateus Lopes', data_paciente: '2002-02-02', idade_paciente: 20, genero_paciente: 'Masculino', cpf_paciente: '01915043603', telefone_paciente:'31995860596', endereco_paciente:'Beco Valadares, 455 - São Gabriel'});
        res.status(201).json({message: 'Paciente criado com sucesso!', paciente: NovoPaciente});

    } catch (error){
         console.error("Erro ao cadastrar paciente:", error);
        res.status(500).json({message: `Erro ao cadastrar o paciente ${error}`});
    }
};


export const GetPaciente = async (req: Request, res: Response) =>{

    try {
        const Pacientes = await Paciente.BuscandoTodosPaciente();
        res.json(Pacientes);
    } catch (error){
        res.status(500).json({ message: `Erro ao buscar o Paciente ${error}`})
    }
};