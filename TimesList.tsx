import React from "react";
import { StyleSheet, ViewProps } from "react-native";
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout,
  Divider,
  IconProps,
  ButtonProps,
  ListItemProps,
} from "@ui-kitten/components";

const TrashIcon = (props: IconProps) => (
  <Icon {...props} name="trash-2-outline" />
);

interface IProps {}

interface IState {
  items: string[];
}

export default class TimesList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { items: [] };

    this.onItemRemove = this.onItemRemove.bind(this);
  }

  onItemRemove(index: number) {
    let items = [...this.state.items];
    items.splice(index, 1);

    this.setState({ items });
  }

  render() {
    const renderItemRemove = (index: number, props?: ViewProps) => (
      <Button
        size="small"
        status="danger"
        accessoryLeft={TrashIcon}
        onPress={() => this.onItemRemove(index)}
      ></Button>
    );

    const renderItem = ({ item, index }: { item: string; index: number }) => (
      <ListItem
        style={styles.item}
        disabled={true}
        title={item}
        accessoryRight={(props) => renderItemRemove(index, props)}
      />
    );

    return (
      <Layout style={styles.container} level="1">
        <List
          data={this.state.items}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
        <Button
          size="giant"
          onPress={(event) =>
            this.setState({
              items: [
                ...this.state.items,
                `Item ${this.state.items.length + 1}`,
              ],
            })
          }
        >
          ADD
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: 10,
  },
});
