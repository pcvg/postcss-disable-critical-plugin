let postcss = require('postcss')

let plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('Works', async () => {
  await run('@critical common.css{.page-title{margin:30px 0 28px;font-weight:700;font-size:36px;}@media(max-width:767px){.page-title{font-size:26px;line-height:1.1;}}}/* Unnecessary comment */.newsletter{display:inline-block;float:left;margin-left:15px;}@critical;.header{display: flex;justify-content:center;align-items:center;padding-top:20px;}@critical;.footer{display:flex;justify-content:center;align-items:center;padding-bottom:20px;}', '.page-title{margin:30px 0 28px;font-weight:700;font-size:36px;}@media(max-width:767px){.page-title{font-size:26px;line-height:1.1;}}.newsletter{display:inline-block;float:left;margin-left:15px;}.header{display: flex;justify-content:center;align-items:center;padding-top:20px;}.footer{display:flex;justify-content:center;align-items:center;padding-bottom:20px;}')
})
