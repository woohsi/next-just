import React, { useState } from 'react';

const RadioExample: React.FC = () => {
  // 使用useState来跟踪选中的选项
  const [selectedOption, setSelectedOption] = useState<string | null>('option2');

  // 处理单选按钮点击事件
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>单选按钮示例</h2>
      <label>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleRadioChange}
        />
        选项1
      </label>
      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedOption === 'option2'}
          onChange={handleRadioChange}
        />
        选项2
      </label>
      <label>
        <input
          type="radio"
          value="option3"
          checked={selectedOption === 'option3'}
          onChange={handleRadioChange}
        />
        选项3
      </label>
      <div>
        <p>当前选中的选项: {selectedOption}</p>
      </div>
    </div>
  );
};

export default RadioExample;
