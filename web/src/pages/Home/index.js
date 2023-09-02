import { marked } from 'marked';
import React, { useEffect, useState } from 'react';
import { API, showError, showNotice } from '../../helpers';
import { Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');

  const displayNotice = async () => {
    const res = await API.get('/api/notice');
    const { success, message, data } = res.data;
    if (success) {
      let oldNotice = localStorage.getItem('notice');
      if (data !== oldNotice && data !== '') {
        const htmlNotice = marked(data);
        showNotice(htmlNotice, true);
        localStorage.setItem('notice', data);
      }
    } else {
      showError(message);
    }
  };

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  useEffect(() => {
    displayNotice().then();
    displayHomePageContent().then();
  }, []);
  return (
    <div className='text-center pt-4'>
      <h1 className='text-[64px] text-gray-800 font-bold'>
        <span className='bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent'>
          大语言模型
        </span>
        应用访问平台
      </h1>
      <div className='text-lg mt-4'>
        免费助力每一位大语言模型爱好者，快速访问与体验大语言模型
      </div>
      <div className='text-lg mt-1'>
        高速、稳定、安全的使用AI服务，构建AI应用
      </div>
      <div className='mt-8'>
        <Link to='/login'>
          <Button color='blue' icon=''>
            开始使用
          </Button>
        </Link>
      </div>
      <div
        style={{ fontSize: 'larger' }}
        dangerouslySetInnerHTML={{ __html: homePageContent }}
      ></div>
    </div>
  );
};

export default Home;
