import React, { Component } from 'react';
import { FlatList, View, Text, Dimensions, Image } from 'react-native';
import styles from '../layout/styles';

const dataList = [
    { key: 'Ivan Ivanov' },
    { key: 'Petr Petrov' },
    { key: 'Sergey Sergeev' },
    { key: 'Maxim Maximov' }
];

export class HelpdeskScreen extends Component {

    public render() {
        // tslint:disable-next-line:max-line-length
        const encodedData2 = 'data:image/png;base64,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';

        return <View>
            <FlatList horizontal pagingEnabled data={dataList} style={{ backgroundColor: '#fff' }} renderItem={({ item }) => <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 50, width: Dimensions.get('window').width, height: 90, backgroundColor: '#fff' }} >
                <View style={{ height: 56, width: 56, justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' }}>
                    <Image source={{uri: encodedData2}} style={{ height: 50, width: 50 }} />
                    <Image source={require('../../src/helpdesk/circleMask.png')} style={{ position: 'absolute' }} />
                </View>
                <View style={{ height: 56, flexDirection: 'column', paddingLeft: 10 }} >
                    <View style={{ height: 28, flexDirection: 'row' }} >
                        <View  style={{ flexDirection: 'column' }} >
                            <Text style={{ fontFamily: 'AppleSDGothicNeo-Regular', fontSize: 14 }}>{item.key}</Text>
                            <Text style={{ fontFamily: 'AppleSDGothicNeo-Regular', fontSize: 12 }}>Employee Position</Text>
                        </View>
                    </View>
                    <View  style={{ height: 28, alignItems: 'flex-end', flexDirection: 'row' }} >
                        <View style={{ height: 12 }} >
                            <Text style={{ fontFamily: 'AppleSDGothicNeo-Bold', fontSize: 12, color: '#2FAFCC' }}>SDO.XXX</Text>
                        </View>
                    </View>
                </View>
            </View>} />
        </View>;
    }
}