interface Services {
  [key: string]: React.JSX.Element;
}

const serviceSvg: Services = {
  EC2: (
    <>
      <path d='M0 0H90V90H0V0Z' fill='url(#paint0_linear_98_212)' />
      <path
        d='M30.375 59.625H58.5V31.5H30.375V59.625ZM60.75 31.5H65.25V33.75H60.75V38.25H65.25V40.5H60.75V43.875H65.25V46.125H60.75V50.625H65.25V52.875H60.75V57.375H65.25V59.625H60.75V59.7779C60.7495 60.334 60.5284 60.8671 60.1353 61.2603C59.7421 61.6535 59.209 61.8745 58.6529 61.875H58.5V66.375H56.25V61.875H51.75V66.375H49.5V61.875H46.125V66.375H43.875V61.875H39.375V66.375H37.125V61.875H32.625V66.375H30.375V61.875H30.2221C29.666 61.8745 29.1329 61.6535 28.7397 61.2603C28.3466 60.8671 28.1255 60.334 28.125 59.7779V59.625H24.75V57.375H28.125V52.875H24.75V50.625H28.125V46.125H24.75V43.875H28.125V40.5H24.75V38.25H28.125V33.75H24.75V31.5H28.125V31.3471C28.1255 30.791 28.3466 30.2579 28.7397 29.8647C29.1329 29.4716 29.666 29.2505 30.2221 29.25H30.375V24.75H32.625V29.25H37.125V24.75H39.375V29.25H43.875V24.75H46.125V29.25H49.5V24.75H51.75V29.25H56.25V24.75H58.5V29.25H58.6529C59.209 29.2505 59.7421 29.4716 60.1353 29.8647C60.5284 30.2579 60.7495 30.791 60.75 31.3471V31.5ZM46.125 74.1104C46.1247 74.1474 46.1099 74.1827 46.0838 74.2088C46.0577 74.2349 46.0224 74.2497 45.9854 74.25H15.8896C15.8526 74.2498 15.8172 74.2351 15.7911 74.2089C15.7649 74.1828 15.7502 74.1474 15.75 74.1104V44.0146C15.7503 43.9776 15.7651 43.9423 15.7912 43.9162C15.8173 43.8901 15.8526 43.8753 15.8896 43.875H22.5V41.625H15.8896C15.256 41.6257 14.6487 41.8777 14.2007 42.3257C13.7527 42.7737 13.5007 43.381 13.5 44.0146V74.1104C13.5007 74.744 13.7527 75.3513 14.2007 75.7993C14.6487 76.2473 15.256 76.4993 15.8896 76.5H45.9854C46.619 76.4993 47.2263 76.2473 47.6743 75.7993C48.1223 75.3513 48.3743 74.744 48.375 74.1104V68.625H46.125V74.1104ZM76.5 15.8896V45.9854C76.4993 46.619 76.2473 47.2263 75.7993 47.6743C75.3513 48.1223 74.744 48.3743 74.1104 48.375H67.5V46.125H74.1104C74.1474 46.1247 74.1827 46.1099 74.2088 46.0838C74.2349 46.0577 74.2497 46.0224 74.25 45.9854V15.8896C74.2498 15.8526 74.2351 15.8172 74.2089 15.7911C74.1828 15.7649 74.1474 15.7502 74.1104 15.75H44.0146C43.9776 15.7502 43.9422 15.7649 43.9161 15.7911C43.89 15.8172 43.8752 15.8526 43.875 15.8896V22.5H41.625V15.8896C41.6257 15.256 41.8777 14.6487 42.3257 14.2007C42.7737 13.7527 43.381 13.5007 44.0146 13.5H74.1104C74.744 13.5007 75.3513 13.7527 75.7993 14.2007C76.2473 14.6487 76.4993 15.256 76.5 15.8896Z'
        fill='white'
      />
      <defs>
        <linearGradient id='paint0_linear_98_212' x1='0' y1='9000' x2='9000' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#C8511B' />
          <stop offset='1' stopColor='#FF9900' />
        </linearGradient>
      </defs>
    </>
  ),
  Route53: (
    <>
      <path d='M0 0H90V90H0V0Z' fill='url(#paint0_linear_98_209)' />
      <path
        d='M54.7782 45.7643C55.6097 46.5332 56.0263 47.5629 56.0263 48.8559C56.0263 50.2629 55.52 51.3861 54.5082 52.2257C53.4957 53.0662 52.1359 53.486 50.429 53.486C49.0801 53.486 47.7449 53.1977 46.424 52.624V50.901C47.9888 51.4185 49.3234 51.6762 50.429 51.6762C51.5203 51.6762 52.3595 51.4322 52.948 50.9449C53.5365 50.4562 53.8301 49.7598 53.8301 48.8559C53.8301 47.1185 52.7332 46.2494 50.5359 46.2494C49.8476 46.2494 49.1659 46.2857 48.4909 46.3563V44.936L53.0134 40.0036H46.6403V38.2377H55.4026V39.9392L50.9669 44.6344C51.0401 44.62 51.1097 44.6133 51.1828 44.6133H51.3976C52.8197 44.6133 53.9457 44.9968 54.7782 45.7643ZM42.2707 45.3885C43.1447 46.2069 43.5824 47.3333 43.5824 48.7684C43.5824 50.176 43.074 51.3137 42.0534 52.1828C41.0342 53.0515 39.6934 53.486 38.028 53.486C36.5655 53.486 35.1944 53.1977 33.9165 52.624V50.901C35.5091 51.4185 36.8731 51.6762 38.0069 51.6762C39.0982 51.6762 39.9338 51.4301 40.5146 50.9337C41.0961 50.4383 41.3876 49.725 41.3876 48.7909C41.3876 47.7714 41.114 47.0317 40.5684 46.5725C40.0228 46.1134 39.133 45.8828 37.899 45.8828C37.0088 45.8828 35.8976 45.9559 34.562 46.0986V44.6773L34.9715 38.2377H42.8297V40.0032H36.7793L36.4994 44.3756C37.289 44.2329 37.9988 44.1608 38.6299 44.1608C40.1803 44.1608 41.3942 44.5693 42.2707 45.3885ZM58.4513 61.175C52.9909 62.1562 48.2082 64.3802 44.9999 66.1918C41.7901 64.3802 37.0078 62.1562 31.5484 61.175C30.0113 60.8994 22.3526 59.3001 22.3526 54.8726C22.3526 52.8208 23.0873 51.4603 24.4978 49.0303C26.1832 46.1246 28.2803 42.5074 28.2803 37.3001C28.2803 33.5784 27.3047 30.0094 25.3788 26.6794C25.6049 26.4002 25.8355 26.1179 26.0672 25.8332C28.9201 27.2591 31.8901 27.9812 34.9097 27.9812C38.5997 27.9812 41.9905 27.0126 44.9999 25.1005C48.0082 27.0126 51.399 27.9816 55.089 27.9816C58.1082 27.9816 61.0796 27.2591 63.9326 25.8332C64.1632 26.1179 64.3938 26.4002 64.6199 26.6794C62.694 30.0094 61.7184 33.5784 61.7184 37.3001C61.7184 42.5074 63.8155 46.1243 65.504 49.0352C66.9113 51.4603 67.6461 52.8208 67.6461 54.8726C67.6461 59.3001 59.987 60.8994 58.4513 61.175ZM63.9684 37.3001C63.9684 33.7472 64.9707 30.3416 66.9451 27.1779C67.0703 26.9788 67.1297 26.7455 67.115 26.5108C67.1003 26.2761 67.0122 26.052 66.8632 25.8701C66.2736 25.1483 65.6859 24.425 65.1001 23.7002C64.9339 23.4947 64.7007 23.3542 64.4413 23.3034C64.1819 23.2526 63.913 23.2948 63.6815 23.4225C60.9109 24.9542 58.0207 25.7305 55.089 25.7305C51.5519 25.7305 48.4613 24.7795 45.6401 22.8248C45.4518 22.6946 45.2283 22.6248 44.9993 22.6248C44.7704 22.6248 44.5469 22.6946 44.3586 22.8248C41.537 24.7795 38.4467 25.7305 34.9097 25.7305C31.978 25.7305 29.0878 24.9542 26.3171 23.4225C26.0857 23.2947 25.8166 23.2526 25.5572 23.3033C25.2977 23.3541 25.0644 23.4946 24.8982 23.7002C24.3126 24.4251 23.725 25.1484 23.1355 25.8701C22.9866 26.052 22.8986 26.2761 22.8838 26.5107C22.869 26.7454 22.9283 26.9787 23.0532 27.1779C25.029 30.3416 26.0303 33.7472 26.0303 37.3001C26.0303 41.902 24.1009 45.2278 22.5505 47.9039C21.0317 50.5171 20.1026 52.2527 20.1026 54.8726C20.1026 60.9353 28.558 62.9262 31.1501 63.3909C36.6176 64.3735 41.3921 66.6907 44.4338 68.4612C44.6056 68.5615 44.8009 68.6144 44.9999 68.6144C45.1988 68.6144 45.3941 68.5615 45.5659 68.4612C48.6076 66.6907 53.3811 64.3735 58.8486 63.3909C61.4407 62.9262 69.8961 60.9353 69.8961 54.8726C69.8961 52.2527 68.9669 50.5171 67.4482 47.9004C65.8978 45.2275 63.9684 41.902 63.9684 37.3001ZM59.6182 67.6765C52.7205 68.9168 46.9384 72.6265 44.9999 73.9846C43.0603 72.6261 37.2778 68.9168 30.3805 67.6765C16.8038 65.2377 15.7499 57.2597 15.7499 54.8726C15.7499 50.9456 17.2922 48.2889 18.7838 45.7172C20.2059 43.2668 21.6765 40.7327 21.6765 37.3001C21.6765 31.8776 18.5455 28.048 17.0007 26.4892C18.6253 24.513 22.7294 19.5092 24.7534 16.9017C27.8201 19.7961 31.3853 21.375 34.91 21.375C38.8226 21.375 42.058 19.7824 44.9999 16.3846C47.9407 19.7824 51.1761 21.375 55.089 21.375C58.6134 21.375 62.1786 19.7958 65.2463 16.9014C67.2703 19.5089 71.3734 24.5127 72.9976 26.4888C71.4532 28.0476 68.3222 31.8772 68.3222 37.2997C68.3222 40.7324 69.7938 43.2668 71.2145 45.7168C72.7076 48.2885 74.2499 50.9456 74.2499 54.8722C74.2499 57.2593 73.1945 65.2373 59.6178 67.6761M73.1607 44.588C71.7713 42.1931 70.5722 40.1256 70.5722 37.2997C70.5722 31.3506 75.2026 27.5027 75.2479 27.4665C75.4811 27.2768 75.6295 27.0025 75.6607 26.7036C75.6753 26.5556 75.6606 26.4061 75.6174 26.2638C75.5741 26.1215 75.5032 25.9891 75.4086 25.8743C75.3334 25.7843 67.959 16.8437 66.269 14.5276C66.1716 14.3937 66.0457 14.283 65.9004 14.2035C65.7552 14.1239 65.5941 14.0775 65.4288 14.0674C65.2634 14.0561 65.0976 14.0821 64.9436 14.1434C64.7896 14.2048 64.6513 14.2999 64.539 14.4218C61.704 17.454 58.349 19.1239 55.089 19.1239C51.4844 19.1239 48.6494 17.518 45.8932 13.9166C45.4667 13.3608 44.533 13.3608 44.1065 13.9166C41.3492 17.518 38.5142 19.1239 34.9097 19.1239C31.6496 19.1239 28.2947 17.454 25.4597 14.4218C25.2301 14.1767 24.9042 14.0372 24.5699 14.0674C24.4045 14.0776 24.2435 14.1242 24.0983 14.2038C23.953 14.2834 23.8272 14.3941 23.7296 14.528C22.0393 16.8437 14.6653 25.7843 14.5897 25.8743C14.4956 25.9891 14.4251 26.1214 14.3822 26.2635C14.3394 26.4057 14.3251 26.5549 14.3401 26.7026C14.3693 27.001 14.5166 27.2756 14.7483 27.4644C14.7954 27.5031 19.4262 31.3506 19.4262 37.2997C19.4262 40.1256 18.2266 42.1931 16.8372 44.588C15.2728 47.2844 13.4995 50.3402 13.4995 54.8722C13.4995 62.4227 19.661 68.0375 29.9829 69.8924C37.7535 71.2888 44.2503 76.217 44.3143 76.268C44.5111 76.4185 44.752 76.5 44.9997 76.4997C45.2475 76.4995 45.4883 76.4175 45.6847 76.2666C45.7497 76.2173 52.2241 71.2919 60.0147 69.8924C70.3366 68.0375 76.4995 62.4227 76.4995 54.8722C76.4995 50.3402 74.7255 47.2844 73.1604 44.588'
        fill='white'
      />
      <defs>
        <linearGradient id='paint0_linear_98_209' x1='0' y1='9000' x2='9000' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#4D27A8' />
          <stop offset='1' stopColor='#A166FF' />
        </linearGradient>
      </defs>
    </>
  ),
  S3: (
    <>
      <path d='M0 0H90V90H0V0Z' fill='url(#paint0_linear_98_211)' />
      <path
        d='M68.4404 48.2541L68.8725 45.2124C72.8557 47.5984 72.9077 48.5838 72.9067 48.6109C72.8996 48.6165 72.2204 49.1836 68.4404 48.2541ZM66.2544 47.6466C59.3694 45.5632 49.7813 41.1645 45.9011 39.3307C45.9011 39.3149 45.9056 39.3005 45.9056 39.2847C45.9056 37.794 44.6927 36.5811 43.2011 36.5811C41.7115 36.5811 40.4986 37.794 40.4986 39.2847C40.4986 40.7753 41.7115 41.9882 43.2011 41.9882C43.8557 41.9882 44.4498 41.7438 44.9188 41.3554C49.4842 43.5168 58.9982 47.8515 65.9338 49.899L63.1913 69.2557C63.1832 69.3084 63.18 69.3612 63.18 69.4143C63.18 71.1186 55.6344 74.2497 43.3055 74.2497C30.8461 74.2497 23.2207 71.1186 23.2207 69.4143C23.2208 69.3631 23.2175 69.312 23.2109 69.2613L17.4804 27.4036C22.4402 30.818 33.1087 32.6243 43.3125 32.6243C53.5004 32.6243 64.1507 30.8243 69.1207 27.4205L66.2544 47.6466ZM16.875 23.0372C16.9559 21.5571 25.463 15.7493 43.3125 15.7493C61.1592 15.7493 69.6677 21.5557 69.75 23.0372V23.5424C68.7712 26.8622 57.7462 30.3747 43.3125 30.3747C28.8538 30.3747 17.8232 26.8509 16.875 23.5266V23.0372ZM72 23.0618C72 19.164 60.8238 13.4993 43.3125 13.4993C25.8005 13.4993 14.625 19.164 14.625 23.0618L14.7305 23.9105L20.9721 69.4997C21.1219 74.5984 34.7182 76.4993 43.3055 76.4993C53.9613 76.4993 65.2823 74.0493 65.4286 69.5032L68.1244 50.4942C69.6238 50.8528 70.8581 51.0363 71.8492 51.0363C73.1798 51.0363 74.0798 50.7111 74.6255 50.0611C75.0734 49.5278 75.2442 48.882 75.1162 48.1943C74.8245 46.6376 72.9763 44.9592 69.2121 42.8115L71.885 23.9541L72 23.0618Z'
        fill='white'
      />
      <defs>
        <linearGradient id='paint0_linear_98_211' x1='0' y1='9000' x2='9000' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#1B660F' />
          <stop offset='1' stopColor='#6CAE3E' />
        </linearGradient>
      </defs>
    </>
  ),
  WAF: (
    <>
      <path d='M0 0H90V90H0V0Z' fill='url(#paint0_linear_98_208)' />
      <path
        d='M16.1953 46.125H13.4995V43.875H16.1985C16.4235 38.1836 18.2685 32.7691 21.6087 28.1531L23.4322 29.4729C20.3712 33.7015 18.6724 38.6613 18.4485 43.875H21.3745V46.125H18.4453C18.6545 51.3696 20.3543 56.359 23.4322 60.6104L21.6087 61.9302C18.2516 57.2917 16.4055 51.8456 16.1953 46.125ZM61.8858 68.4316C57.2599 71.7806 51.8307 73.6256 46.1245 73.8439V76.5H43.8745V73.8439C38.1687 73.6256 32.737 71.7806 28.1112 68.4316L29.4295 66.6091C33.6708 69.679 38.6457 71.3777 43.8745 71.5939V68.625H46.1245V71.5939C51.3537 71.3767 56.3272 69.6779 60.5674 66.6088L61.8858 68.4316ZM28.1112 21.6517C32.737 18.3027 38.1687 16.4577 43.8745 16.2404V13.5H46.1245V16.2404C51.8304 16.4577 57.2599 18.3038 61.8858 21.6517L60.5674 23.4742C56.3276 20.405 51.3537 18.7066 46.1245 18.4904V21.375H43.8745V18.4904C38.6457 18.7052 33.6708 20.4054 29.4295 23.4742L28.1112 21.6517ZM76.4995 43.875V46.125H73.802C73.5928 51.8456 71.7453 57.2917 68.3897 61.9302L66.5651 60.6104C69.6426 56.359 71.3438 51.3696 71.552 46.125H68.6245V43.875H71.5485C71.3245 38.6617 69.6258 33.7015 66.5647 29.4729L68.3893 28.1531C71.7285 32.7691 73.5735 38.1836 73.7985 43.875H76.4995ZM61.8429 26.6062L70.6632 17.7862L72.254 19.3771L63.434 28.1971L61.8429 26.6062ZM28.1544 63.4771L19.3344 72.2971L17.7436 70.7063L26.5636 61.8862L28.1544 63.4771ZM30.6586 32.2502L13.9632 15.5552L15.554 13.9648L32.2497 30.6598L30.6586 32.2502ZM59.2955 57.7048L76.0344 74.4448L74.4436 76.0352L57.7036 59.2966L59.2955 57.7048ZM35.6219 45.8269C35.7063 45.6771 35.7977 45.5266 35.893 45.3758C37.7844 42.4048 37.2419 38.3502 36.6411 35.9012C38.2625 36.9664 39.7236 39.1679 40.2221 40.0929C40.4348 40.4842 40.8479 40.7215 41.3011 40.6811C41.5183 40.6641 41.726 40.5846 41.8989 40.452C42.0718 40.3193 42.2026 40.1394 42.2753 39.934C43.9504 35.1752 43.0986 31.5977 41.9174 29.2792C43.3496 30.1127 44.4592 31.3123 45.1936 32.8409C46.7865 36.1508 46.4321 40.6811 44.2665 44.6625C41.3088 50.1029 41.9019 55.807 42.5744 58.8758C40.8859 58.1481 39.383 57.3254 38.0857 56.4209C34.6805 54.0471 33.5969 49.3952 35.6219 45.8269ZM50.7307 45.4479C50.6948 45.6725 50.7276 45.9027 50.825 46.1083C50.9224 46.3139 51.0797 46.4851 51.2763 46.5996C51.4732 46.7137 51.7 46.7655 51.9269 46.7482C52.1538 46.731 52.3702 46.6454 52.5476 46.5029C52.639 46.4298 54.4836 44.9068 55.3769 41.2225C56.4538 42.7883 57.5798 45.9485 56.0811 51.7535C54.5986 57.4966 47.5649 59.1117 45.0551 59.509C44.4486 57.3346 43.2192 51.2989 46.2444 45.7369C48.3907 41.7881 48.9599 37.3229 47.8844 33.6386C49.9207 36.0302 51.6388 39.7944 50.7307 45.4475V45.4479ZM33.6623 44.7187C31.0724 49.2862 32.4494 55.2364 36.7986 58.2673C38.7674 59.6398 41.1524 60.8309 43.8861 61.8086C44.0077 61.8526 44.1361 61.875 44.2655 61.875C44.289 61.875 44.3094 61.8627 44.3319 61.8616L44.3329 61.8715C44.8111 61.8346 56.054 60.8579 58.2594 52.316C61.0965 41.329 55.4142 38.07 55.1713 37.9361C55.0086 37.8468 54.8264 37.7991 54.6408 37.7974C54.4553 37.7957 54.2722 37.8399 54.1079 37.9261C53.9436 38.0123 53.8032 38.1379 53.6992 38.2916C53.5952 38.4453 53.5308 38.6223 53.5119 38.8069C53.4417 39.492 53.3228 40.1713 53.1561 40.8396C52.3778 32.2133 45.5388 28.7033 44.1561 28.0789C42.7386 26.9933 41.0153 26.2473 39.0173 25.8929C38.7737 25.8492 38.5224 25.8876 38.3029 26.002C38.0834 26.1165 37.908 26.3006 37.8044 26.5254C37.6998 26.75 37.672 27.0029 37.7256 27.2449C37.7791 27.4869 37.9108 27.7046 38.1004 27.8641C38.2692 28.0069 41.7746 31.0465 40.7744 36.8314C39.4684 35.1179 37.3892 33.0525 34.9438 33.0525C34.7611 33.0528 34.5812 33.0975 34.4197 33.1828C34.2581 33.2681 34.1197 33.3914 34.0164 33.5421C33.9131 33.6927 33.848 33.8663 33.8267 34.0477C33.8053 34.2291 33.8285 34.413 33.894 34.5836C33.9186 34.6444 36.2115 40.6867 33.9942 44.1686C33.8794 44.3494 33.7687 44.5328 33.6623 44.7187Z'
        fill='white'
      />
      <defs>
        <linearGradient id='paint0_linear_98_208' x1='0' y1='9000' x2='9000' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#BD0816' />
          <stop offset='1' stopColor='#FF5252' />
        </linearGradient>
      </defs>
    </>
  ),
  RDS: (
    <>
      <path d='M0 0H90V90H0V0Z' fill='url(#paint0_linear_98_210)' />
      <path
        d='M17.3408 15.75L27.7952 26.2048L26.2048 27.7952L15.75 17.3408V25.875H13.5V14.625C13.5 14.4773 13.5291 14.331 13.5856 14.1945C13.6422 14.058 13.725 13.934 13.8295 13.8295C13.934 13.725 14.058 13.6422 14.1945 13.5856C14.331 13.5291 14.4773 13.5 14.625 13.5H25.875V15.75H17.3408ZM76.5 14.625V25.875H74.25V17.3408L63.7952 27.7952L62.2048 26.2048L72.6592 15.75H64.125V13.5H75.375C75.6734 13.5 75.9595 13.6185 76.1705 13.8295C76.3815 14.0405 76.5 14.3266 76.5 14.625ZM74.25 64.125H76.5V75.375C76.5 75.6734 76.3815 75.9595 76.1705 76.1705C75.9595 76.3815 75.6734 76.5 75.375 76.5H64.125V74.25H72.6592L62.2048 63.7952L63.7952 62.2048L74.25 72.6592V64.125ZM73.6875 44.1148C73.6875 40.3808 69.3766 36.6919 62.1562 34.2471L62.8773 32.1166C71.1766 34.9256 75.9375 39.2984 75.9375 44.1148C75.9375 48.9319 71.1766 53.306 62.8762 56.1136L62.1552 53.9821C69.3763 51.5387 73.6875 47.8508 73.6875 44.1148ZM16.3758 44.1148C16.3758 47.6923 20.411 51.2831 27.1709 53.7223L26.4073 55.8383C18.6019 53.0223 14.1254 48.7498 14.1254 44.1148C14.1254 39.4808 18.6019 35.2079 26.4073 32.3909L27.1709 34.5073C20.411 36.9471 16.3754 40.5383 16.3754 44.1148H16.3758ZM27.7952 63.7952L17.3408 74.25H25.875V76.5H14.625C14.4773 76.5 14.331 76.4709 14.1945 76.4144C14.058 76.3578 13.934 76.275 13.8295 76.1705C13.725 76.066 13.6422 75.942 13.5856 75.8055C13.5291 75.669 13.5 75.5227 13.5 75.375V64.125H15.75V72.6592L26.2048 62.2048L27.7952 63.7952ZM45 35.1967C36.9608 35.1967 32.625 33.12 32.625 32.2717C32.625 31.4223 36.9608 29.3467 45 29.3467C53.0381 29.3467 57.375 31.4223 57.375 32.2717C57.375 33.12 53.0381 35.1967 45 35.1967ZM45.0327 43.9098C37.3352 43.9098 32.625 41.8075 32.625 40.6631V35.1946C35.396 36.7235 40.3109 37.4467 45 37.4467C49.6891 37.4467 54.604 36.7235 57.375 35.1946V40.6631C57.375 41.8085 52.6894 43.9098 45.0327 43.9098ZM45.0327 52.5002C37.3352 52.5002 32.625 50.3979 32.625 49.2536V43.72C35.3602 45.3273 40.2096 46.1598 45.0327 46.1598C49.8284 46.1598 54.6504 45.3284 57.375 43.7252V49.2539C57.375 50.3993 52.6894 52.5006 45.0327 52.5006V52.5002ZM45 60.2079C36.9935 60.2079 32.625 58.0556 32.625 56.9496V52.3104C35.3602 53.9177 40.2096 54.7502 45.0327 54.7502C49.8284 54.7502 54.6504 53.9202 57.375 52.316V56.9496C57.375 58.0556 53.0065 60.2079 45 60.2079ZM45 27.0967C37.9564 27.0967 30.375 28.7156 30.375 32.2717V56.9496C30.375 60.5654 37.7325 62.4579 45 62.4579C52.2675 62.4579 59.625 60.5654 59.625 56.9496V32.2717C59.625 28.7156 52.0436 27.0967 45 27.0967Z'
        fill='white'
      />
      <defs>
        <linearGradient id='paint0_linear_98_210' x1='0' y1='9000' x2='9000' y2='0' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2E27AD' />
          <stop offset='1' stopColor='#527FFF' />
        </linearGradient>
      </defs>
    </>
  ),
};

export const getService = (type: string): React.JSX.Element => {
  return serviceSvg[type];
};
