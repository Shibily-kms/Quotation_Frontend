import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: 'black'
    },
    tableRow: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black'

    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 600,
        textAlign: 'center',
    },
    tableCell: {
        backgroundColor: 'white',
        flex: 1,
        fontSize: '11px',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        textAlign: 'center',
        borderStyle: 'solid',
    },
    tableFooter: {
        fontWeight: 700,
        textAlign: 'center',
        backgroundColor: '#bdbdbd'
    }
});
const TableModel = ({ data, total }) => {
    return (

        <View style={styles.table} >
            {
                data.map((obj, index) => (
                    <View style={styles.tableRow} key={index}>
                        {Object.entries(obj).map((item, idx) => (
                            <Text key={idx} style={index === 0 ? [styles.tableCell, styles.tableHeader] :
                                index === (data.length - 1) && total ? [styles.tableCell, styles.tableFooter] : styles.tableCell}>
                                {item[1]}</Text>
                        ))}
                    </View>
                ))
            }
        </View >

    );
};

export default TableModel;
