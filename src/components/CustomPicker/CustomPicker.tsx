import React, { useState } from 'react'

import {
  View,
  Picker,
  Modal,
  Button,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export type PickerItemType = { label: string; value: any }
type CustomPickerPropTypes = {
  items: PickerItemType[]
  selectedValue: any
  onChange: (value: any) => any
  styles?: { input?: ViewStyle; label?: TextStyle }
}

const isIos = Platform.OS === 'ios'

const defaultStyles = StyleSheet.create({
  picker: {
    minWidth: 100,
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { marginRight: 4 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
})

export default ({
  items,
  selectedValue,
  onChange,
  styles = {},
}: CustomPickerPropTypes) => {
  const [modalVisible, setModalVisible] = useState(false)

  const selectedItem = items.find(
    (item: PickerItemType) => item.value === selectedValue,
  )

  const selectedLabel = selectedItem ? selectedItem.label : ''

  if (isIos) {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={[defaultStyles.picker, styles.input]}>
            <Text style={[defaultStyles.label, styles.label]}>
              {selectedLabel}
            </Text>
            <AntDesign name='down' size={18} />
          </View>
        </TouchableOpacity>
        <Modal visible={modalVisible} onRequestClose={() => {}} transparent>
          <View style={defaultStyles.modalContainer}>
            <View style={defaultStyles.modalContentContainer}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                  onChange(itemValue)
                }}
              >
                {items.map(({ label, value }: PickerItemType, i: number) => (
                  <Picker.Item key={`item${i}`} label={label} value={value} />
                ))}
              </Picker>
              <Button title='Done' onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </React.Fragment>
    )
  }
  return (
    <View>
      <View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onChange}
          mode='dropdown'
        >
          {items.map(({ label, value }: PickerItemType, i: number) => (
            <Picker.Item key={`item${i}`} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  )
}
