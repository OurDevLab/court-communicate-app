import React from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import moment from 'moment';

const { Option } = Select;

const EditCassationForm = ({ initialValues, onFinish }) => {
  return (
    <Form
      initialValues={{
        ...initialValues,
        date: moment(initialValues.date),
        sentenceDate: moment(initialValues.sentenceDate),
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item label="Miejscowość" name="location">
        <Input placeholder="Wpisz miejscowość" />
      </Form.Item>

      <Form.Item label="Data" name="date" rules={[{ required: true, message: 'Wybierz datę!' }]}>
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item label="Sąd" name="court" rules={[{ required: true, message: 'Wybierz sąd!' }]}>
        <Select placeholder="Wybierz sąd">
          <Option value="warszawa">Warszawie</Option>
          <Option value="krakow">Krakowie</Option>
          <Option value="poznan">Poznaniu</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Skarżący" name="complainant" rules={[{ required: true, message: 'Wpisz nazwisko skarżącego!' }]}>
        <Input placeholder="Wpisz skarżącego" />
      </Form.Item>

      <Form.Item label="Reprezentowani przez" name="attorney">
        <Select placeholder="Wybierz pełnomocnika">
          <Option value="adwokat">Adwokata</Option>
          <Option value="radca">Radcę prawnego</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Organ" name="govbody" rules={[{ required: true, message: 'Wpisz nazwę organu!' }]}>
        <Input placeholder="Wpisz nazwę organu" />
      </Form.Item>

      <Form.Item label="Sygnatura akt" name="sygnature" rules={[{ required: true, message: 'Wpisz sygnaturę akt!' }]}>
        <Input placeholder="Wpisz sygnaturę akt" />
      </Form.Item>

      <Form.Item label="Wartość przedmiotu zaskarżenia" name="value">
        <InputNumber placeholder="Wpisz wartość" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Wpis" name="entryValue">
        <InputNumber placeholder="Wpisz wysokość wpisu" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Rozporządzenie Rady Ministrów" name="ordinance">
        <Input placeholder="Wpisz rozporządzenie Rady Ministrów z dnia" />
      </Form.Item>

      <Form.Item label="Wyrok z dnia" name="sentenceDate">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Sygn. akt wyroku" name="sygnatureSentence">
        <Input placeholder="Wpisz sygnaturę wyroku" />
      </Form.Item>

      <Form.Item label="Zarzuty wobec wyroku" name="plea">
        <Input.TextArea placeholder="Wpisz zarzuty" rows={4} />
      </Form.Item>

      <Form.Item label="Prośba o uchwałę" name="resolution">
        <Input.TextArea placeholder="Wpisz prośbę" rows={4} />
      </Form.Item>

      <Form.Item label="Uzasadnienie" name="justification">
        <Input.TextArea placeholder="Wpisz uzasadnienie" rows={6} />
      </Form.Item>

      <Form.Item label="Załączniki" name="attachments">
        <Input.TextArea placeholder="Wpisz załączniki" rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Zapisz zmiany
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCassationForm;
