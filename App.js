import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import RNRestart from 'react-native-restart';

const MyFallbackComponent = (error, resetError) => (
    <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ fontSize: 20 }}>Something went wrong:</Text>
        <Text onPress={resetError} style={{ color: 'blue', marginTop: 10, fontSize: 30 }}>
            Try again
        </Text>
        <View style={{ marginTop: 10 }}>
            <Button title="Retry" onPress={() => RNRestart.Restart()} />
        </View>
    </View>
);

const App = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [age, setAge] = useState(null);
    const [goal, setGoal] = useState(null);
    const [student, setStudent] = useState(null);
    const [listData, setListData] = useState([]);
    // Trigger error during render
    const renderItem = ({ item }) => {
        let { firstName, lastName, age, student, goal } = item;

        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textStyleViewShowingItems}>{firstName}</Text>
                <Text style={styles.textStyleViewShowingItems}>{lastName}</Text>
                <Text style={styles.textStyleViewShowingItems}>{age}</Text>
                <Text style={styles.textStyleViewShowingItems}>{student}</Text>
                <Text style={styles.textStyleViewShowingItems}>{goal.trim()}</Text>
            </View>
        );
    };

    return (
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
            <ScrollView style={styles.containerStyle}>
                <Text style={{ marginLeft: 16 }}>First name</Text>
                <TextInput onChangeText={setFirstName} style={styles.textInputStyle} placeholder="Enter First Name" />
                <Text style={{ marginLeft: 16 }}>Last name</Text>
                <TextInput onChangeText={setLastName} style={styles.textInputStyle} placeholder="Enter Last Name" />
                <Text style={{ marginLeft: 16 }}>Age</Text>
                <TextInput onChangeText={setAge} style={styles.textInputStyle} placeholder="your age" />
                <Text style={{ marginLeft: 16 }}>Are you a student?</Text>
                <TextInput onChangeText={setStudent} style={styles.textInputStyle} placeholder="" />
                <Text style={{ marginLeft: 16 }}>what's your goal</Text>
                <TextInput onChangeText={setGoal} style={styles.textInputStyle} placeholder="Life Goal" />
                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                    <Button
                        color={'blue'}
                        onPress={() => {
                            if (firstName && lastName && age) {
                                setListData([...listData, { firstName, lastName, student, goal, age }]);
                            }
                            setGoal(null);
                            setFirstName(null);
                            setLastName(null);
                            setStudent(null);
                            setAge(null);
                        }}
                        title="Submit"
                    />
                </View>
                <FlatList data={listData} renderItem={renderItem} />
            </ScrollView>
        </ErrorBoundary>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginTop: 20,
    },
    textInputStyle: {
        margin: 16,
        borderWidth: 1,
        borderColor: 'grey',
    }, textStyleViewShowingItems: {
        marginLeft: 10,
    },
});

export default App;
