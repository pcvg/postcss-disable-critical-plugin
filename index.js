// The plugin to remove unnecessary @critical stuff on development

let postcss = require('postcss')

module.exports = postcss.plugin('postcss-su-dev', () => {
  return root => {
    root.walkComments(comment => {
      comment.remove()
    })

    let first = false

    root.walkAtRules('critical', rule => {
      let child = rule.nodes

      if (child) {
        rule.parent.insertAfter(rule, child)
        rule.remove()
      }

      if (!first) {
        first = true
      } else {
        rule.remove()
      }
    })
  }
})
