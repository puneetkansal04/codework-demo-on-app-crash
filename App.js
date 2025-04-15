import React, { useState, useCallback, memo } from 'react';
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

// Memoized input component to avoid re-rendering unless props change
const TextUIComponent = memo(({ label, placeholder, keyValue, value, onChange }) => (
    <View>
        <Text style={{ marginLeft: 16 }}>{label}</Text>
        <TextInput
            value={value}
            onChangeText={(v) => onChange(keyValue, v)}
            style={styles.textInputStyle}
            placeholder={placeholder}
        />
    </View>
));

const App = () => {
    const [formData, setFormData] = useState({});
    const [listData, setListData] = useState([]);

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        setListData((prev) => [...prev, formData]);
    };

    const renderItem = useCallback(({ item }) => {
        const { firstName, lastName, age, student, goal } = item;

        return (
            <View style={styles.userListViewContainerStyle}>
                <Text style={styles.textStyleViewShowingItems}>{firstName}</Text>
                <Text style={styles.textStyleViewShowingItems}>{lastName}</Text>
                <Text style={styles.textStyleViewShowingItems}>{age}</Text>
                <Text style={styles.textStyleViewShowingItems}>{student}</Text>
                <Text style={styles.textStyleViewShowingItems}>{goal?.trim()}</Text>
            </View>
        );
    }, []);

    return (
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
            <ScrollView style={styles.containerStyle}>
                <TextUIComponent
                    label={'First name'}
                    placeholder={'Enter First Name'}
                    keyValue={'firstName'}
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                />
                <TextUIComponent
                    label={'Last name'}
                    placeholder={'Enter Last Name'}
                    keyValue={'lastName'}
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                />
                <TextUIComponent
                    label={'Age'}
                    placeholder={'your age'}
                    keyValue={'age'}
                    value={formData.age || ''}
                    onChange={handleInputChange}
                />
                <TextUIComponent
                    label={'Are you a student?'}
                    placeholder={'yes or no'}
                    keyValue={'student'}
                    value={formData.student || ''}
                    onChange={handleInputChange}
                />
                <TextUIComponent
                    label={'your goal'}
                    placeholder={'your goal'}
                    keyValue={'goal'}
                    value={formData.goal || ''}
                    onChange={handleInputChange}
                />

                <View style={{ marginTop: 10, marginHorizontal: 16 }}>
                    <Button color={'blue'} onPress={handleSubmit} title="Submit" />
                </View>

                <FlatList
                    data={listData}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                />
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
    }, userListViewContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default App;
