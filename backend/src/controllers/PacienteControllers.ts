import { Request, Response } from "express";
import Paciente from "../models/Paciente";

export const PostCriandoPaciente = async(req: Request, res: Response) => {
    const { nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente } = req.body;
    console.log("Recebendo dados do formulário:", req.body);

    try{

        const NovoPaciente = await Paciente.criandoPaciente({nome_paciente: 'Mateus Lopes', data_paciente: '2002-02-02', idade_paciente: 20, genero_paciente: 'Masculino', cpf_paciente: '01915043603', telefone_paciente:'31995860596', endereco_paciente:'Beco Valadares, 455 - São Gabriel'});
        res.status(201).json({message: 'Paciente criado com sucesso!', paciente: NovoPaciente});
        console.log('Dados recebidos:', NovoPaciente );

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
        console.log(`Error ao buscar pacientes: ${error}`)
        res.status(500).json({ message: `Erro ao buscar o Paciente ${error}`})
    }
};

export const GetPacienteByID = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id, 10);

    try{
        const paciente = await Paciente.BuscandoPacienteID(Number(id));
        if(paciente){
            res.json(paciente);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado'});
        }
    } catch(error){
        res.status(500).json({ message:'Erro ao buscar usuario', error})
    }
};

export const SetPacienteByID = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const {nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente } = req.body;
  
    try {

        console.log(`Atualizando paciente com ID: ${id}`);
        console.log("Dados recebidos:", req.body);


        const paciente_put = await Paciente.atualizarPaciente(id, {nome_paciente: 'Lena Rita', data_paciente:'1987-05-27', idade_paciente: 48, genero_paciente: 'FEMININO', cpf_paciente: '04243709645', telefone_paciente: '31985221524', endereco_paciente: 'BECO VALADARES, 455 - SÃO GABRIEL'});
        console.log(`Atualizações do paciente ${paciente_put}`);
        res.status(200).json({message: 'Paciente atualizado com sucesso!', paciente_put});
    } catch(error){
        console.error("Erro ao atualizar paciente:", error);
        res.status(500).json({ message: 'Erro ao atualizar o paciente: ', error})
    }
}

export const DeletePaciente = async(req: Request, res:Response) => {
    const id = parseInt(req.params.id);

    try{
        const paciente = await Paciente.deletarPaciente(id);
        res.status(200).json({message: `Usuario ${paciente} excluido com sucesso!`});
    } catch (error){
        res.status(500).json({ message: `Erro ao excluir paciente ${error}`})
    }
}