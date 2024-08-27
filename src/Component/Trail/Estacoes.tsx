import React, { useMemo, useState } from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { getColor } from "../../Utils/Color";

type AlunoProps = {
    id: number
    name: string
    active: boolean,
    onClick: () => void
}
const Aluno: React.FC<AlunoProps> = ({ id, name, onClick, active }) => {

    return (
        <Card onClick={onClick} style={{ backgroundColor: active ? "#999" : "" }}>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                {/*<Card.Meta><Label color={false ? "green" : "red"} content={false ? "Aprovado" : "Reprovado"} /></Card.Meta>*/}
            </Card.Content>
        </Card>
    )
}

type AlunosProps = {
    data: any[]
    selected: number[]
    setSelected: (selected: number[]) => void
}

const Estacoes = ({ data, selected, setSelected }: AlunosProps) => {
    const handleClick = (id: number) => () => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id))
        } else {
            setSelected([...selected, id])
        }
    }
    return (
        <Card.Group>
            <Aluno active={selected.includes(0)} onClick={handleClick(0)} id={0} name={"Estação 1"} />
            <Aluno active={selected.includes(1)} onClick={handleClick(1)} id={1} name={"Estação 2"} />
        </Card.Group>
    )
}
export default Estacoes;