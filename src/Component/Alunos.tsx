import React, { useState } from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { getColor } from "../Utils/Color";

const listAlunos = [
    {
        name: 'Steve Sanders',
        description: 'Steve wants to add you to the group best friends',
        image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
        status: 1
    },
    {
        name: 'Elliot Fu',
        description: 'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.',
        image: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
        status: 1
    },
    {
        name: 'Jenny Hess',
        description: 'Jenny is a student studying Media Management at the New School',
        image: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
        status: 0
    }
]


type AlunoProps = {
    id: number
    name: string
    active: boolean,
    onClick: () => void
}
const Aluno: React.FC<AlunoProps> = ({ id, name, onClick, active }) => {

    return (
        <Card onClick={onClick} style={{ backgroundColor: active ? getColor(id) : "" }}>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={"https://i.pravatar.cc/300?img=" + id}
                />
                <Card.Header>{name}</Card.Header>
                <Card.Meta><Label color={false ? "green" : "red"} content={false ? "Aprovado" : "Reprovado"} /></Card.Meta>
            </Card.Content>
        </Card>
    )
}

type AlunosProps = {
    data: any[]
    selected: number[]
    setSelected: (selected: number[]) => void
}

const Alunos = ({ data, selected, setSelected }: AlunosProps) => {
    const handleClick = (id: number) => () => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id))
        } else {
            setSelected([...selected, id])
        }
    }
    return (
        <Card.Group style={{ height: 500, overflow: "auto" }}>
            {data.map((item, key) => <Aluno active={selected.includes(key)} onClick={handleClick(key)} id={key} key={key} name={"Aluno " + key} />)}
        </Card.Group>
    )
}
export default Alunos;