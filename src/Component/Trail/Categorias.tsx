import React from "react";
import { Header, Icon, Label, List, ListContent, Segment } from "semantic-ui-react";
import { getColor } from "../../Utils/Color";
import { useApp } from "../AppContext";

type CategoriasProps = {
    title: string
    list: any
}

type Item = {
    uuid: string
    name: string
    users: boolean[]
}

const Categorias: React.FC<CategoriasProps> = ({ title, list }) => {
    const { itemHighlight,setTimelineHighlight } = useApp();

    const itens: Record<string, Item> = {};
    /*
    list.map((item, key) => item.rating.find((rating) => rating.name === title)?.checks).map((checks, key) => {
        checks?.map((check) => {
            if (!itens[check.uuid]) {
                itens[check.uuid] = {
                    uuid: check.uuid,
                    name: check.name,
                    users: []
                }
            }
            itens[check.uuid].users[key] = check.value > 0; //.push(check.value > 0)
        });
    });*/

    const handleMouseEnter = (uuid : string) => () => {
        setTimelineHighlight((old) => [...old, uuid]);
    }
    const handleMouseLeave = (uuid : string) => () => {
        setTimelineHighlight((old) => old.filter((item) => item !== uuid));
    }

    return (
        <Segment>
            <Header>{title}</Header>
            <List divided>
                {Object.entries(itens).map(([, item]) => (
                    <List.Item key={item.uuid} onMouseEnter={handleMouseEnter(item.uuid)} onMouseLeave={handleMouseLeave(item.uuid)} className={itemHighlight.includes(item.uuid) ? "highlight" :""}>
                        <ListContent floated="right">
                            {item.users.map((check,user) => <div style={{display:"inline-block"}} data-tooltip={check ? "Acertou" : "Errou"}><Icon key={user} name={check ? "check circle" : "times circle"} style={{ color: getColor(user) }} /></div>)}
                        </ListContent>
                        <ListContent>{item.name}</ListContent>
                    </List.Item>
                ))}
            </List>
        </Segment>
    )
}

export default Categorias;