var ht = Array.isArray, on = Array.prototype.indexOf, Lt = Array.from, At = Object.defineProperty, je = Object.getOwnPropertyDescriptor, cn = Object.getOwnPropertyDescriptors, vn = Object.prototype, dn = Array.prototype, dr = Object.getPrototypeOf, Zt = Object.isExtensible;
function hn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function _n() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const z = 2, Dt = 4, _t = 8, Ye = 16, oe = 32, ge = 64, hr = 128, X = 256, it = 512, B = 1024, ee = 2048, he = 4096, Q = 8192, Oe = 16384, Mt = 32768, _r = 65536, Jt = 1 << 17, pn = 1 << 18, Pt = 1 << 19, Ut = 1 << 20, St = 1 << 21, Ft = 1 << 22, pe = 1 << 23, xe = Symbol("$state"), wn = Symbol(""), jt = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function bn() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function gn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function yn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function mn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function En(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function xn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function kn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function In() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Tn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
const pt = 1, wt = 2, pr = 4, An = 8, Sn = 16, On = 2, V = Symbol(), Cn = "http://www.w3.org/1999/xhtml", Nn = "@attach";
function Rn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let Ln = !1;
function wr(e) {
  return e === this.v;
}
function Dn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function br(e) {
  return !Dn(e, this.v);
}
let te = null;
function lt(e) {
  te = e;
}
function He(e, t = !1, r) {
  te = {
    p: te,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function We(e) {
  var t = (
    /** @type {ComponentContext} */
    te
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      Lr(n);
  }
  return te = t.p, /** @type {T} */
  {};
}
function gr() {
  return !0;
}
const Mn = /* @__PURE__ */ new WeakMap();
function Pn(e) {
  var t = A;
  if (t === null)
    return I.f |= pe, e;
  if ((t.f & Mt) === 0) {
    if ((t.f & hr) === 0)
      throw !t.parent && e instanceof Error && yr(e), e;
    t.b.error(e);
  } else
    Vt(e, t);
}
function Vt(e, t) {
  for (; t !== null; ) {
    if ((t.f & hr) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && yr(e), e;
}
function yr(e) {
  const t = Mn.get(e);
  t && (At(e, "message", {
    value: t.message
  }), At(e, "stack", {
    value: t.stack
  }));
}
let st = [];
function Un() {
  var e = st;
  st = [], hn(e);
}
function bt(e) {
  st.length === 0 && queueMicrotask(Un), st.push(e);
}
function Fn() {
  for (var e = (
    /** @type {Effect} */
    A.b
  ); e !== null && !e.has_pending_snippet(); )
    e = e.parent;
  return e === null && bn(), e;
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
  var t = z | ee, r = I !== null && (I.f & z) !== 0 ? (
    /** @type {Derived} */
    I
  ) : null;
  return A === null || r !== null && (r.f & X) !== 0 ? t |= X : A.f |= Pt, {
    ctx: te,
    deps: null,
    effects: null,
    equals: wr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      V
    ),
    wv: 0,
    parent: r ?? A,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function jn(e, t) {
  let r = (
    /** @type {Effect | null} */
    A
  );
  r === null && gn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = Se(
    /** @type {V} */
    V
  ), a = null, u = !I;
  return Qn(() => {
    try {
      var s = e();
    } catch (_) {
      s = Promise.reject(_);
    }
    var f = () => s;
    i = a?.then(f, f) ?? Promise.resolve(s), a = i;
    var c = (
      /** @type {Batch} */
      D
    ), v = n.pending;
    u && (n.update_pending_count(1), v || c.increment());
    const o = (_, h = void 0) => {
      a = null, v || c.activate(), h ? h !== jt && (l.f |= pe, Ke(l, h)) : ((l.f & pe) !== 0 && (l.f ^= pe), Ke(l, _)), u && (n.update_pending_count(-1), v || c.decrement()), kr();
    };
    if (i.then(o, (_) => o(null, _ || "unknown")), c)
      return () => {
        queueMicrotask(() => c.neuter());
      };
  }), new Promise((s) => {
    function f(c) {
      function v() {
        c === i ? s(l) : f(i);
      }
      c.then(v, v);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Qe(e) {
  const t = /* @__PURE__ */ Bt(e);
  return Kr(t), t;
}
// @__NO_SIDE_EFFECTS__
function Vn(e) {
  const t = /* @__PURE__ */ Bt(e);
  return t.equals = br, t;
}
function mr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      Z(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Bn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & z) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Kt(e) {
  var t, r = A;
  de(Bn(e));
  try {
    mr(e), t = Hr(e);
  } finally {
    de(r);
  }
  return t;
}
function Er(e) {
  var t = Kt(e);
  if (e.equals(t) || (e.v = t, e.wv = $r()), !Ce)
    if (Te !== null)
      Te.set(e, e.v);
    else {
      var r = (ve || (e.f & X) !== 0) && e.deps !== null ? he : B;
      $(e, r);
    }
}
function xr(e, t, r) {
  const n = Bt;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var i = D, l = (
    /** @type {Effect} */
    A
  ), a = Kn(), u = Fn();
  Promise.all(t.map((s) => /* @__PURE__ */ jn(s))).then((s) => {
    i?.activate(), a();
    try {
      r([...e.map(n), ...s]);
    } catch (f) {
      (l.f & Oe) === 0 && Vt(f, l);
    }
    i?.deactivate(), kr();
  }).catch((s) => {
    u.error(s);
  });
}
function Kn() {
  var e = A, t = I, r = te;
  return function() {
    de(e), le(t), lt(r);
  };
}
function kr() {
  de(null), le(null), lt(null);
}
const Le = /* @__PURE__ */ new Set();
let D = null, tt = null, Te = null, Qt = /* @__PURE__ */ new Set(), at = [];
function Ir() {
  const e = (
    /** @type {() => void} */
    at.shift()
  );
  at.length > 0 && queueMicrotask(Ir), e();
}
let Be = [], qt = null, Ot = !1;
class Ae {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #t = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #l = null;
  /**
   * True if an async effect inside this batch resolved and
   * its parent branch was already deleted
   */
  #s = !1;
  /**
   * Async effects (created inside `async_derived`) encountered during processing.
   * These run after the rest of the batch has updated, since they should
   * always have the latest values
   * @type {Effect[]}
   */
  #n = [];
  /**
   * The same as `#async_effects`, but for effects inside a newly-created
   * `<svelte:boundary>` — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #u = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #a = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #i = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #f = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #c = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #v = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    Be = [], tt = null;
    var r = null;
    if (Le.size > 1) {
      r = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map();
      for (const [l, a] of this.current)
        r.set(l, { v: l.v, wv: l.wv }), l.v = a;
      for (const l of Le)
        if (l !== this)
          for (const [a, u] of l.#r)
            r.has(a) || (r.set(a, { v: a.v, wv: a.wv }), a.v = u);
    }
    for (const l of t)
      this.#h(l);
    if (this.#n.length === 0 && this.#t === 0) {
      this.#d();
      var n = this.#a, i = this.#i;
      this.#a = [], this.#i = [], this.#f = [], tt = D, D = null, er(n), er(i), D === null ? D = this : Le.delete(this), this.#l?.resolve();
    } else
      this.#o(this.#a), this.#o(this.#i), this.#o(this.#f);
    if (r) {
      for (const [l, { v: a, wv: u }] of r)
        l.wv <= u && (l.v = a);
      Te = null;
    }
    for (const l of this.#n)
      Ve(l);
    for (const l of this.#u)
      Ve(l);
    this.#n = [], this.#u = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #h(t) {
    t.f ^= B;
    for (var r = t.first; r !== null; ) {
      var n = r.f, i = (n & (oe | ge)) !== 0, l = i && (n & B) !== 0, a = l || (n & Q) !== 0 || this.skipped_effects.has(r);
      if (!a && r.fn !== null) {
        if (i)
          r.f ^= B;
        else if ((n & B) === 0)
          if ((n & Dt) !== 0)
            this.#i.push(r);
          else if ((n & Ft) !== 0) {
            var u = r.b?.pending ? this.#u : this.#n;
            u.push(r);
          } else gt(r) && ((r.f & Ye) !== 0 && this.#f.push(r), Ve(r));
        var s = r.first;
        if (s !== null) {
          r = s;
          continue;
        }
      }
      var f = r.parent;
      for (r = r.next; r === null && f !== null; )
        r = f.next, f = f.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #o(t) {
    for (const r of t)
      ((r.f & ee) !== 0 ? this.#c : this.#v).push(r), $(r, B);
    t.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    this.#r.has(t) || this.#r.set(t, r), this.current.set(t, t.v);
  }
  activate() {
    D = this;
  }
  deactivate() {
    D = null, tt = null;
    for (const t of Qt)
      if (Qt.delete(t), t(), D !== null)
        break;
  }
  neuter() {
    this.#s = !0;
  }
  flush() {
    Be.length > 0 ? qn() : this.#d(), D === this && (this.#t === 0 && Le.delete(this), this.deactivate());
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #d() {
    if (!this.#s)
      for (const t of this.#e)
        t();
    this.#e.clear();
  }
  increment() {
    this.#t += 1;
  }
  decrement() {
    if (this.#t -= 1, this.#t === 0) {
      for (const t of this.#c)
        $(t, ee), be(t);
      for (const t of this.#v)
        $(t, he), be(t);
      this.#a = [], this.#i = [], this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    this.#e.add(t);
  }
  settled() {
    return (this.#l ??= _n()).promise;
  }
  static ensure() {
    if (D === null) {
      const t = D = new Ae();
      Le.add(D), Ae.enqueue(() => {
        D === t && t.flush();
      });
    }
    return D;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    at.length === 0 && queueMicrotask(Ir), at.unshift(t);
  }
}
function qn() {
  var e = Ie;
  Ot = !0;
  try {
    var t = 0;
    for (rr(!0); Be.length > 0; ) {
      var r = Ae.ensure();
      if (t++ > 1e3) {
        var n, i;
        $n();
      }
      r.process(Be), we.clear();
    }
  } finally {
    Ot = !1, rr(e), qt = null;
  }
}
function $n() {
  try {
    xn();
  } catch (e) {
    Vt(e, qt);
  }
}
function er(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (Oe | Q)) === 0 && gt(n)) {
        var i = D ? D.current.size : 0;
        if (Ve(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? Ur(n) : n.fn = null), D !== null && D.current.size > i && (n.f & Ut) !== 0)
          break;
      }
    }
    for (; r < t; )
      be(e[r++]);
  }
}
function be(e) {
  for (var t = qt = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (Ot && t === A && (r & Ye) !== 0)
      return;
    if ((r & (ge | oe)) !== 0) {
      if ((r & B) === 0) return;
      t.f ^= B;
    }
  }
  Be.push(t);
}
const we = /* @__PURE__ */ new Map();
function Se(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: wr,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function P(e, t) {
  const r = Se(e);
  return Kr(r), r;
}
// @__NO_SIDE_EFFECTS__
function Yn(e, t = !1, r = !0) {
  const n = Se(e);
  return t || (n.equals = br), n;
}
function S(e, t, r = !1) {
  I !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ie || (I.f & Jt) !== 0) && gr() && (I.f & (z | Ye | Ft | Jt)) !== 0 && !ue?.includes(e) && Tn();
  let n = r ? Ue(t) : t;
  return Ke(e, n);
}
function Ke(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Ce ? we.set(e, t) : we.set(e, r), e.v = t;
    var n = Ae.ensure();
    n.capture(e, r), (e.f & z) !== 0 && ((e.f & ee) !== 0 && Kt(
      /** @type {Derived} */
      e
    ), $(e, (e.f & X) === 0 ? B : he)), e.wv = $r(), Tr(e, ee), A !== null && (A.f & B) !== 0 && (A.f & (oe | ge)) === 0 && (G === null ? ri([e]) : G.push(e));
  }
  return t;
}
function ke(e) {
  S(e, e.v + 1);
}
function Tr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, i = 0; i < n; i++) {
      var l = r[i], a = l.f, u = (a & ee) === 0;
      u && $(l, t), (a & z) !== 0 ? Tr(
        /** @type {Derived} */
        l,
        he
      ) : u && be(
        /** @type {Effect} */
        l
      );
    }
}
function Ue(e) {
  if (typeof e != "object" || e === null || xe in e)
    return e;
  const t = dr(e);
  if (t !== vn && t !== dn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = ht(e), i = /* @__PURE__ */ P(0), l = fe, a = (u) => {
    if (fe === l)
      return u();
    var s = I, f = fe;
    le(null), ir(l);
    var c = u();
    return le(s), ir(f), c;
  };
  return n && r.set("length", /* @__PURE__ */ P(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(u, s, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && kn();
        var c = r.get(s);
        return c === void 0 ? c = a(() => {
          var v = /* @__PURE__ */ P(f.value);
          return r.set(s, v), v;
        }) : S(c, f.value, !0), !0;
      },
      deleteProperty(u, s) {
        var f = r.get(s);
        if (f === void 0) {
          if (s in u) {
            const c = a(() => /* @__PURE__ */ P(V));
            r.set(s, c), ke(i);
          }
        } else
          S(f, V), ke(i);
        return !0;
      },
      get(u, s, f) {
        if (s === xe)
          return e;
        var c = r.get(s), v = s in u;
        if (c === void 0 && (!v || je(u, s)?.writable) && (c = a(() => {
          var _ = Ue(v ? u[s] : V), h = /* @__PURE__ */ P(_);
          return h;
        }), r.set(s, c)), c !== void 0) {
          var o = p(c);
          return o === V ? void 0 : o;
        }
        return Reflect.get(u, s, f);
      },
      getOwnPropertyDescriptor(u, s) {
        var f = Reflect.getOwnPropertyDescriptor(u, s);
        if (f && "value" in f) {
          var c = r.get(s);
          c && (f.value = p(c));
        } else if (f === void 0) {
          var v = r.get(s), o = v?.v;
          if (v !== void 0 && o !== V)
            return {
              enumerable: !0,
              configurable: !0,
              value: o,
              writable: !0
            };
        }
        return f;
      },
      has(u, s) {
        if (s === xe)
          return !0;
        var f = r.get(s), c = f !== void 0 && f.v !== V || Reflect.has(u, s);
        if (f !== void 0 || A !== null && (!c || je(u, s)?.writable)) {
          f === void 0 && (f = a(() => {
            var o = c ? Ue(u[s]) : V, _ = /* @__PURE__ */ P(o);
            return _;
          }), r.set(s, f));
          var v = p(f);
          if (v === V)
            return !1;
        }
        return c;
      },
      set(u, s, f, c) {
        var v = r.get(s), o = s in u;
        if (n && s === "length")
          for (var _ = f; _ < /** @type {Source<number>} */
          v.v; _ += 1) {
            var h = r.get(_ + "");
            h !== void 0 ? S(h, V) : _ in u && (h = a(() => /* @__PURE__ */ P(V)), r.set(_ + "", h));
          }
        if (v === void 0)
          (!o || je(u, s)?.writable) && (v = a(() => /* @__PURE__ */ P(void 0)), S(v, Ue(f)), r.set(s, v));
        else {
          o = v.v !== V;
          var w = a(() => Ue(f));
          S(v, w);
        }
        var y = Reflect.getOwnPropertyDescriptor(u, s);
        if (y?.set && y.set.call(c, f), !o) {
          if (n && typeof s == "string") {
            var M = (
              /** @type {Source<number>} */
              r.get("length")
            ), b = Number(s);
            Number.isInteger(b) && b >= M.v && S(M, b + 1);
          }
          ke(i);
        }
        return !0;
      },
      ownKeys(u) {
        p(i);
        var s = Reflect.ownKeys(u).filter((v) => {
          var o = r.get(v);
          return o === void 0 || o.v !== V;
        });
        for (var [f, c] of r)
          c.v !== V && !(f in u) && s.push(f);
        return s;
      },
      setPrototypeOf() {
        In();
      }
    }
  );
}
function tr(e) {
  try {
    if (e !== null && typeof e == "object" && xe in e)
      return e[xe];
  } catch {
  }
  return e;
}
function Hn(e, t) {
  return Object.is(tr(e), tr(t));
}
var Ct, Ar, Sr, Or;
function Wn() {
  if (Ct === void 0) {
    Ct = window, Ar = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    Sr = je(t, "firstChild").get, Or = je(t, "nextSibling").get, Zt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Zt(r) && (r.__t = void 0);
  }
}
function $t(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Cr(e) {
  return Sr.call(e);
}
// @__NO_SIDE_EFFECTS__
function Yt(e) {
  return Or.call(e);
}
function F(e, t) {
  return /* @__PURE__ */ Cr(e);
}
function ae(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Yt(n);
  return n;
}
function zn(e) {
  e.textContent = "";
}
function Gn() {
  return !1;
}
function Nr(e) {
  A === null && I === null && En(), I !== null && (I.f & X) !== 0 && A === null && mn(), Ce && yn();
}
function Xn(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function se(e, t, r, n = !0) {
  var i = A;
  i !== null && (i.f & Q) !== 0 && (e |= Q);
  var l = {
    ctx: te,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | ee,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      Ve(l), l.f |= Mt;
    } catch (s) {
      throw Z(l), s;
    }
  else t !== null && be(l);
  var a = r && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & Pt) === 0;
  if (!a && n && (i !== null && Xn(l, i), I !== null && (I.f & z) !== 0 && (e & ge) === 0)) {
    var u = (
      /** @type {Derived} */
      I
    );
    (u.effects ??= []).push(l);
  }
  return l;
}
function Rr(e) {
  const t = se(_t, null, !1);
  return $(t, B), t.teardown = e, t;
}
function ut(e) {
  Nr();
  var t = (
    /** @type {Effect} */
    A.f
  ), r = !I && (t & oe) !== 0 && (t & Mt) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      te
    );
    (n.e ??= []).push(e);
  } else
    return Lr(e);
}
function Lr(e) {
  return se(Dt | Ut, e, !1);
}
function Zn(e) {
  return Nr(), se(_t | Ut, e, !0);
}
function Jn(e) {
  Ae.ensure();
  const t = se(ge, e, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? Fr(t, () => {
      Z(t), n(void 0);
    }) : (Z(t), n(void 0));
  });
}
function Ht(e) {
  return se(Dt, e, !1);
}
function Qn(e) {
  return se(Ft | Pt, e, !0);
}
function Dr(e, t = 0) {
  return se(_t | t, e, !0);
}
function Wt(e, t = [], r = []) {
  xr(t, r, (n) => {
    se(_t, () => e(...n.map(p)), !0);
  });
}
function zt(e, t = 0) {
  var r = se(Ye | t, e, !0);
  return r;
}
function ze(e, t = !0) {
  return se(oe, e, !0, t);
}
function Mr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Ce, n = I;
    nr(!0), le(null);
    try {
      t.call(null);
    } finally {
      nr(r), le(n);
    }
  }
}
function Pr(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    r.ac?.abort(jt);
    var n = r.next;
    (r.f & ge) !== 0 ? r.parent = null : Z(r, t), r = n;
  }
}
function ei(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & oe) === 0 && Z(t), t = r;
  }
}
function Z(e, t = !0) {
  var r = !1;
  (t || (e.f & pn) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (ti(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Pr(e, t && !r), ft(e, 0), $(e, Oe);
  var n = e.transitions;
  if (n !== null)
    for (const l of n)
      l.stop();
  Mr(e);
  var i = e.parent;
  i !== null && i.first !== null && Ur(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function ti(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Yt(e)
    );
    e.remove(), e = r;
  }
}
function Ur(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Fr(e, t) {
  var r = [];
  Gt(e, r, !0), jr(r, () => {
    Z(e), t && t();
  });
}
function jr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var i of e)
      i.out(n);
  } else
    t();
}
function Gt(e, t, r) {
  if ((e.f & Q) === 0) {
    if (e.f ^= Q, e.transitions !== null)
      for (const a of e.transitions)
        (a.is_global || r) && t.push(a);
    for (var n = e.first; n !== null; ) {
      var i = n.next, l = (n.f & _r) !== 0 || (n.f & oe) !== 0;
      Gt(n, t, l ? r : !1), n = i;
    }
  }
}
function Vr(e) {
  Br(e, !0);
}
function Br(e, t) {
  if ((e.f & Q) !== 0) {
    e.f ^= Q, (e.f & B) === 0 && ($(e, ee), be(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & _r) !== 0 || (r.f & oe) !== 0;
      Br(r, i ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || t) && l.in();
  }
}
let Ie = !1;
function rr(e) {
  Ie = e;
}
let Ce = !1;
function nr(e) {
  Ce = e;
}
let I = null, ie = !1;
function le(e) {
  I = e;
}
let A = null;
function de(e) {
  A = e;
}
let ue = null;
function Kr(e) {
  I !== null && (ue === null ? ue = [e] : ue.push(e));
}
let K = null, W = 0, G = null;
function ri(e) {
  G = e;
}
let qr = 1, qe = 0, fe = qe;
function ir(e) {
  fe = e;
}
let ve = !1;
function $r() {
  return ++qr;
}
function gt(e) {
  var t = e.f;
  if ((t & ee) !== 0)
    return !0;
  if ((t & he) !== 0) {
    var r = e.deps, n = (t & X) !== 0;
    if (r !== null) {
      var i, l, a = (t & it) !== 0, u = n && A !== null && !ve, s = r.length;
      if ((a || u) && (A === null || (A.f & Oe) === 0)) {
        var f = (
          /** @type {Derived} */
          e
        ), c = f.parent;
        for (i = 0; i < s; i++)
          l = r[i], (a || !l?.reactions?.includes(f)) && (l.reactions ??= []).push(f);
        a && (f.f ^= it), u && c !== null && (c.f & X) === 0 && (f.f ^= X);
      }
      for (i = 0; i < s; i++)
        if (l = r[i], gt(
          /** @type {Derived} */
          l
        ) && Er(
          /** @type {Derived} */
          l
        ), l.wv > e.wv)
          return !0;
    }
    (!n || A !== null && !ve) && $(e, B);
  }
  return !1;
}
function Yr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !ue?.includes(e))
    for (var i = 0; i < n.length; i++) {
      var l = n[i];
      (l.f & z) !== 0 ? Yr(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (r ? $(l, ee) : (l.f & B) !== 0 && $(l, he), be(
        /** @type {Effect} */
        l
      ));
    }
}
function Hr(e) {
  var t = K, r = W, n = G, i = I, l = ve, a = ue, u = te, s = ie, f = fe, c = e.f;
  K = /** @type {null | Value[]} */
  null, W = 0, G = null, ve = (c & X) !== 0 && (ie || !Ie || I === null), I = (c & (oe | ge)) === 0 ? e : null, ue = null, lt(e.ctx), ie = !1, fe = ++qe, e.ac !== null && (e.ac.abort(jt), e.ac = null);
  try {
    e.f |= St;
    var v = (
      /** @type {Function} */
      (0, e.fn)()
    ), o = e.deps;
    if (K !== null) {
      var _;
      if (ft(e, W), o !== null && W > 0)
        for (o.length = W + K.length, _ = 0; _ < K.length; _++)
          o[W + _] = K[_];
      else
        e.deps = o = K;
      if (!ve || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (c & z) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (_ = W; _ < o.length; _++)
          (o[_].reactions ??= []).push(e);
    } else o !== null && W < o.length && (ft(e, W), o.length = W);
    if (gr() && G !== null && !ie && o !== null && (e.f & (z | he | ee)) === 0)
      for (_ = 0; _ < /** @type {Source[]} */
      G.length; _++)
        Yr(
          G[_],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (qe++, G !== null && (n === null ? n = G : n.push(.../** @type {Source[]} */
    G))), (e.f & pe) !== 0 && (e.f ^= pe), v;
  } catch (h) {
    return Pn(h);
  } finally {
    e.f ^= St, K = t, W = r, G = n, I = i, ve = l, ue = a, lt(u), ie = s, fe = f;
  }
}
function ni(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = on.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (t.f & z) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (K === null || !K.includes(t)) && ($(t, he), (t.f & (X | it)) === 0 && (t.f ^= it), mr(
    /** @type {Derived} **/
    t
  ), ft(
    /** @type {Derived} **/
    t,
    0
  ));
}
function ft(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      ni(e, r[n]);
}
function Ve(e) {
  var t = e.f;
  if ((t & Oe) === 0) {
    $(e, B);
    var r = A, n = Ie;
    A = e, Ie = !0;
    try {
      (t & Ye) !== 0 ? ei(e) : Pr(e), Mr(e);
      var i = Hr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = qr;
      var l;
    } finally {
      Ie = n, A = r;
    }
  }
}
function p(e) {
  var t = e.f, r = (t & z) !== 0;
  if (I !== null && !ie) {
    var n = A !== null && (A.f & Oe) !== 0;
    if (!n && !ue?.includes(e)) {
      var i = I.deps;
      if ((I.f & St) !== 0)
        e.rv < qe && (e.rv = qe, K === null && i !== null && i[W] === e ? W++ : K === null ? K = [e] : (!ve || !K.includes(e)) && K.push(e));
      else {
        (I.deps ??= []).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [I] : l.includes(I) || l.push(I);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), u = a.parent;
    u !== null && (u.f & X) === 0 && (a.f ^= X);
  }
  if (Ce) {
    if (we.has(e))
      return we.get(e);
    if (r) {
      a = /** @type {Derived} */
      e;
      var s = a.v;
      return ((a.f & B) === 0 && a.reactions !== null || Wr(a)) && (s = Kt(a)), we.set(a, s), s;
    }
  } else if (r) {
    if (a = /** @type {Derived} */
    e, Te?.has(a))
      return Te.get(a);
    gt(a) && Er(a);
  }
  if ((e.f & pe) !== 0)
    throw e.v;
  return e.v;
}
function Wr(e) {
  if (e.v === V) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (we.has(t) || (t.f & z) !== 0 && Wr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function zr(e) {
  var t = ie;
  try {
    return ie = !0, e();
  } finally {
    ie = t;
  }
}
const ii = -7169;
function $(e, t) {
  e.f = e.f & ii | t;
}
function li(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const si = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function ai(e) {
  return si.includes(e);
}
const ui = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function fi(e) {
  return e = e.toLowerCase(), ui[e] ?? e;
}
const oi = ["touchstart", "touchmove"];
function ci(e) {
  return oi.includes(e);
}
function vi(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, bt(() => {
      document.activeElement === r && e.focus();
    });
  }
}
let lr = !1;
function di() {
  lr || (lr = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Gr(e) {
  var t = I, r = A;
  le(null), de(null);
  try {
    return e();
  } finally {
    le(t), de(r);
  }
}
function hi(e, t, r, n = r) {
  e.addEventListener(t, () => Gr(r));
  const i = e.__on_r;
  i ? e.__on_r = () => {
    i(), n(!0);
  } : e.__on_r = () => n(!0), di();
}
const Xr = /* @__PURE__ */ new Set(), Nt = /* @__PURE__ */ new Set();
function Zr(e, t, r, n = {}) {
  function i(l) {
    if (n.capture || Fe.call(t, l), !l.cancelBubble)
      return Gr(() => r?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? bt(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function Jr(e, t, r, n, i) {
  var l = { capture: n, passive: i }, a = Zr(e, t, r, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Rr(() => {
    t.removeEventListener(e, a, l);
  });
}
function Xt(e) {
  for (var t = 0; t < e.length; t++)
    Xr.add(e[t]);
  for (var r of Nt)
    r(e);
}
let sr = null;
function Fe(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  sr = e;
  var a = 0, u = sr === e && e.__root;
  if (u) {
    var s = i.indexOf(u);
    if (s !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    s <= f && (a = s);
  }
  if (l = /** @type {Element} */
  i[a] || e.target, l !== t) {
    At(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var c = I, v = A;
    le(null), de(null);
    try {
      for (var o, _ = []; l !== null; ) {
        var h = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var w = l["__" + n];
          if (w != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l))
            if (ht(w)) {
              var [y, ...M] = w;
              y.apply(l, [e, ...M]);
            } else
              w.call(l, e);
        } catch (b) {
          o ? _.push(b) : o = b;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        l = h;
      }
      if (o) {
        for (let b of _)
          queueMicrotask(() => {
            throw b;
          });
        throw o;
      }
    } finally {
      e.__root = t, delete e.currentTarget, le(c), de(v);
    }
  }
}
function _i(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function pi(e, t) {
  var r = (
    /** @type {Effect} */
    A
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Ge(e, t) {
  var r = (t & On) !== 0, n, i = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = _i(i ? e : "<!>" + e), n = /** @type {Node} */
    /* @__PURE__ */ Cr(n));
    var l = (
      /** @type {TemplateNode} */
      r || Ar ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return pi(l, l), l;
  };
}
function $e(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ot(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function zi(e, t) {
  return wi(e, t);
}
const Ee = /* @__PURE__ */ new Map();
function wi(e, { target: t, anchor: r, props: n = {}, events: i, context: l, intro: a = !0 }) {
  Wn();
  var u = /* @__PURE__ */ new Set(), s = (v) => {
    for (var o = 0; o < v.length; o++) {
      var _ = v[o];
      if (!u.has(_)) {
        u.add(_);
        var h = ci(_);
        t.addEventListener(_, Fe, { passive: h });
        var w = Ee.get(_);
        w === void 0 ? (document.addEventListener(_, Fe, { passive: h }), Ee.set(_, 1)) : Ee.set(_, w + 1);
      }
    }
  };
  s(Lt(Xr)), Nt.add(s);
  var f = void 0, c = Jn(() => {
    var v = r ?? t.appendChild($t());
    return ze(() => {
      if (l) {
        He({});
        var o = (
          /** @type {ComponentContext} */
          te
        );
        o.c = l;
      }
      i && (n.$$events = i), f = e(v, n) || {}, l && We();
    }), () => {
      for (var o of u) {
        t.removeEventListener(o, Fe);
        var _ = (
          /** @type {number} */
          Ee.get(o)
        );
        --_ === 0 ? (document.removeEventListener(o, Fe), Ee.delete(o)) : Ee.set(o, _);
      }
      Nt.delete(s), v !== r && v.parentNode?.removeChild(v);
    };
  });
  return bi.set(f, c), f;
}
let bi = /* @__PURE__ */ new WeakMap();
function gi(e, t, r) {
  for (var n = e.items, i = [], l = t.length, a = 0; a < l; a++)
    Gt(t[a].e, i, !0);
  var u = l > 0 && i.length === 0 && r !== null;
  if (u) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    zn(s), s.append(
      /** @type {Element} */
      r
    ), n.clear(), ne(e, t[0].prev, t[l - 1].next);
  }
  jr(i, () => {
    for (var f = 0; f < l; f++) {
      var c = t[f];
      u || (n.delete(c.k), ne(e, c.prev, c.next)), Z(c.e, !u);
    }
  });
}
function yt(e, t, r, n, i, l = null) {
  var a = e, u = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, s = (t & pr) !== 0;
  if (s) {
    var f = (
      /** @type {Element} */
      e
    );
    a = f.appendChild($t());
  }
  var c = null, v = !1, o = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ Vn(() => {
    var M = r();
    return ht(M) ? M : M == null ? [] : Lt(M);
  }), h, w;
  function y() {
    yi(
      w,
      h,
      u,
      o,
      a,
      i,
      t,
      n,
      r
    ), l !== null && (h.length === 0 ? c ? Vr(c) : c = ze(() => l(a)) : c !== null && Fr(c, () => {
      c = null;
    }));
  }
  zt(() => {
    w ??= /** @type {Effect} */
    A, h = p(_);
    var M = h.length;
    if (!(v && M === 0)) {
      v = M === 0;
      var b, E, O, L;
      if (Gn()) {
        var g = /* @__PURE__ */ new Set(), C = (
          /** @type {Batch} */
          D
        );
        for (E = 0; E < M; E += 1) {
          O = h[E], L = n(O, E);
          var Y = u.items.get(L) ?? o.get(L);
          Y ? (t & (pt | wt)) !== 0 && Qr(Y, O, E, t) : (b = en(
            null,
            u,
            null,
            null,
            O,
            L,
            E,
            i,
            t,
            r,
            !0
          ), o.set(L, b)), g.add(L);
        }
        for (const [ye, Ne] of u.items)
          g.has(ye) || C.skipped_effects.add(Ne.e);
        C.add_callback(y);
      } else
        y();
      p(_);
    }
  });
}
function yi(e, t, r, n, i, l, a, u, s) {
  var f = (a & An) !== 0, c = (a & (pt | wt)) !== 0, v = t.length, o = r.items, _ = r.first, h = _, w, y = null, M, b = [], E = [], O, L, g, C;
  if (f)
    for (C = 0; C < v; C += 1)
      O = t[C], L = u(O, C), g = o.get(L), g !== void 0 && (g.a?.measure(), (M ??= /* @__PURE__ */ new Set()).add(g));
  for (C = 0; C < v; C += 1) {
    if (O = t[C], L = u(O, C), g = o.get(L), g === void 0) {
      var Y = n.get(L);
      if (Y !== void 0) {
        n.delete(L), o.set(L, Y);
        var ye = y ? y.next : h;
        ne(r, y, Y), ne(r, Y, ye), mt(Y, ye, i), y = Y;
      } else {
        var Ne = h ? (
          /** @type {TemplateNode} */
          h.e.nodes_start
        ) : i;
        y = en(
          Ne,
          r,
          y,
          y === null ? r.first : y.next,
          O,
          L,
          C,
          l,
          a,
          s
        );
      }
      o.set(L, y), b = [], E = [], h = y.next;
      continue;
    }
    if (c && Qr(g, O, C, a), (g.e.f & Q) !== 0 && (Vr(g.e), f && (g.a?.unfix(), (M ??= /* @__PURE__ */ new Set()).delete(g))), g !== h) {
      if (w !== void 0 && w.has(g)) {
        if (b.length < E.length) {
          var re = E[0], H;
          y = re.prev;
          var Xe = b[0], me = b[b.length - 1];
          for (H = 0; H < b.length; H += 1)
            mt(b[H], re, i);
          for (H = 0; H < E.length; H += 1)
            w.delete(E[H]);
          ne(r, Xe.prev, me.next), ne(r, y, Xe), ne(r, me, re), h = re, y = me, C -= 1, b = [], E = [];
        } else
          w.delete(g), mt(g, h, i), ne(r, g.prev, g.next), ne(r, g, y === null ? r.first : y.next), ne(r, y, g), y = g;
        continue;
      }
      for (b = [], E = []; h !== null && h.k !== L; )
        (h.e.f & Q) === 0 && (w ??= /* @__PURE__ */ new Set()).add(h), E.push(h), h = h.next;
      if (h === null)
        continue;
      g = h;
    }
    b.push(g), y = g, h = g.next;
  }
  if (h !== null || w !== void 0) {
    for (var _e = w === void 0 ? [] : Lt(w); h !== null; )
      (h.e.f & Q) === 0 && _e.push(h), h = h.next;
    var Re = _e.length;
    if (Re > 0) {
      var Ze = (a & pr) !== 0 && v === 0 ? i : null;
      if (f) {
        for (C = 0; C < Re; C += 1)
          _e[C].a?.measure();
        for (C = 0; C < Re; C += 1)
          _e[C].a?.fix();
      }
      gi(r, _e, Ze);
    }
  }
  f && bt(() => {
    if (M !== void 0)
      for (g of M)
        g.a?.apply();
  }), e.first = r.first && r.first.e, e.last = y && y.e;
  for (var d of n.values())
    Z(d.e);
  n.clear();
}
function Qr(e, t, r, n) {
  (n & pt) !== 0 && Ke(e.v, t), (n & wt) !== 0 ? Ke(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function en(e, t, r, n, i, l, a, u, s, f, c) {
  var v = (s & pt) !== 0, o = (s & Sn) === 0, _ = v ? o ? /* @__PURE__ */ Yn(i, !1, !1) : Se(i) : i, h = (s & wt) === 0 ? a : Se(a), w = {
    i: h,
    v: _,
    k: l,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (e === null) {
      var y = document.createDocumentFragment();
      y.append(e = $t());
    }
    return w.e = ze(() => u(
      /** @type {Node} */
      e,
      _,
      h,
      f
    ), Ln), w.e.prev = r && r.e, w.e.next = n && n.e, r === null ? c || (t.first = w) : (r.next = w, r.e.next = w.e), n !== null && (n.prev = w, n.e.prev = w.e), w;
  } finally {
  }
}
function mt(e, t, r) {
  for (var n = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : r, i = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : r, l = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); l !== null && l !== n; ) {
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Yt(l)
    );
    i.before(l), l = a;
  }
}
function ne(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function mi(e, t) {
  var r = void 0, n;
  zt(() => {
    r !== (r = t()) && (n && (Z(n), n = null), r && (n = ze(() => {
      Ht(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function tn(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = tn(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Ei() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = tn(e)) && (n && (n += " "), n += t);
  return n;
}
function xi(e) {
  return typeof e == "object" ? Ei(e) : e ?? "";
}
const ar = [...` 	
\r\f \v\uFEFF`];
function ki(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var l = i.length, a = 0; (a = n.indexOf(i, a)) >= 0; ) {
          var u = a + l;
          (a === 0 || ar.includes(n[a - 1])) && (u === n.length || ar.includes(n[u])) ? n = (a === 0 ? "" : n.substring(0, a)) + n.substring(u + 1) : a = u;
        }
  }
  return n === "" ? null : n;
}
function ur(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var i in e) {
    var l = e[i];
    l != null && l !== "" && (n += " " + i + ": " + l + r);
  }
  return n;
}
function Et(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Ii(e, t) {
  if (t) {
    var r = "", n, i;
    if (Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var l = !1, a = 0, u = !1, s = [];
      n && s.push(...Object.keys(n).map(Et)), i && s.push(...Object.keys(i).map(Et));
      var f = 0, c = -1;
      const w = e.length;
      for (var v = 0; v < w; v++) {
        var o = e[v];
        if (u ? o === "/" && e[v - 1] === "*" && (u = !1) : l ? l === o && (l = !1) : o === "/" && e[v + 1] === "*" ? u = !0 : o === '"' || o === "'" ? l = o : o === "(" ? a++ : o === ")" && a--, !u && l === !1 && a === 0) {
          if (o === ":" && c === -1)
            c = v;
          else if (o === ";" || v === w - 1) {
            if (c !== -1) {
              var _ = Et(e.substring(f, c).trim());
              if (!s.includes(_)) {
                o !== ";" && v++;
                var h = e.substring(f, v).trim();
                r += " " + h + ";";
              }
            }
            f = v + 1, c = -1;
          }
        }
      }
    }
    return n && (r += ur(n)), i && (r += ur(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function rn(e, t, r, n, i, l) {
  var a = e.__className;
  if (a !== r || a === void 0) {
    var u = ki(r, n, l);
    u == null ? e.removeAttribute("class") : t ? e.className = u : e.setAttribute("class", u), e.__className = r;
  } else if (l && i !== l)
    for (var s in l) {
      var f = !!l[s];
      (i == null || f !== !!i[s]) && e.classList.toggle(s, f);
    }
  return l;
}
function xt(e, t = {}, r, n) {
  for (var i in r) {
    var l = r[i];
    t[i] !== l && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, l, n));
  }
}
function Ti(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var l = Ii(t, n);
    l == null ? e.removeAttribute("style") : e.style.cssText = l, e.__style = t;
  } else n && (Array.isArray(n) ? (xt(e, r?.[0], n[0]), xt(e, r?.[1], n[1], "important")) : xt(e, r, n));
  return n;
}
function Rt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!ht(t))
      return Rn();
    for (var n of e.options)
      n.selected = t.includes(fr(n));
    return;
  }
  for (n of e.options) {
    var i = fr(n);
    if (Hn(i, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function Ai(e) {
  var t = new MutationObserver(() => {
    Rt(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Rr(() => {
    t.disconnect();
  });
}
function fr(e) {
  return "__value" in e ? e.__value : e.value;
}
const De = Symbol("class"), Me = Symbol("style"), nn = Symbol("is custom element"), ln = Symbol("is html");
function Si(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function ct(e, t, r, n) {
  var i = an(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[wn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && un(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function Oi(e, t, r, n, i = !1) {
  var l = an(e), a = l[nn], u = !l[ln], s = t || {}, f = e.tagName === "OPTION";
  for (var c in t)
    c in r || (r[c] = null);
  r.class ? r.class = xi(r.class) : r[De] && (r.class = null), r[Me] && (r.style ??= null);
  var v = un(e);
  for (const b in r) {
    let E = r[b];
    if (f && b === "value" && E == null) {
      e.value = e.__value = "", s[b] = E;
      continue;
    }
    if (b === "class") {
      var o = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      rn(e, o, E, n, t?.[De], r[De]), s[b] = E, s[De] = r[De];
      continue;
    }
    if (b === "style") {
      Ti(e, E, t?.[Me], r[Me]), s[b] = E, s[Me] = r[Me];
      continue;
    }
    var _ = s[b];
    if (!(E === _ && !(E === void 0 && e.hasAttribute(b)))) {
      s[b] = E;
      var h = b[0] + b[1];
      if (h !== "$$")
        if (h === "on") {
          const O = {}, L = "$$" + b;
          let g = b.slice(2);
          var w = ai(g);
          if (li(g) && (g = g.slice(0, -7), O.capture = !0), !w && _) {
            if (E != null) continue;
            e.removeEventListener(g, s[L], O), s[L] = null;
          }
          if (E != null)
            if (w)
              e[`__${g}`] = E, Xt([g]);
            else {
              let C = function(Y) {
                s[b].call(this, Y);
              };
              s[L] = Zr(g, e, C, O);
            }
          else w && (e[`__${g}`] = void 0);
        } else if (b === "style")
          ct(e, b, E);
        else if (b === "autofocus")
          vi(
            /** @type {HTMLElement} */
            e,
            !!E
          );
        else if (!a && (b === "__value" || b === "value" && E != null))
          e.value = e.__value = E;
        else if (b === "selected" && f)
          Si(
            /** @type {HTMLOptionElement} */
            e,
            E
          );
        else {
          var y = b;
          u || (y = fi(y));
          var M = y === "defaultValue" || y === "defaultChecked";
          if (E == null && !a && !M)
            if (l[b] = null, y === "value" || y === "checked") {
              let O = (
                /** @type {HTMLInputElement} */
                e
              );
              const L = t === void 0;
              if (y === "value") {
                let g = O.defaultValue;
                O.removeAttribute(y), O.defaultValue = g, O.value = O.__value = L ? g : null;
              } else {
                let g = O.defaultChecked;
                O.removeAttribute(y), O.defaultChecked = g, O.checked = L ? g : !1;
              }
            } else
              e.removeAttribute(b);
          else M || v.includes(y) && (a || typeof E != "string") ? e[y] = E : typeof E != "function" && ct(e, y, E);
        }
    }
  }
  return s;
}
function sn(e, t, r = [], n = [], i, l = !1) {
  xr(r, n, (a) => {
    var u = void 0, s = {}, f = e.nodeName === "SELECT", c = !1;
    if (zt(() => {
      var o = t(...a.map(p)), _ = Oi(e, u, o, i, l);
      c && f && "value" in o && Rt(
        /** @type {HTMLSelectElement} */
        e,
        o.value
      );
      for (let w of Object.getOwnPropertySymbols(s))
        o[w] || Z(s[w]);
      for (let w of Object.getOwnPropertySymbols(o)) {
        var h = o[w];
        w.description === Nn && (!u || h !== u[w]) && (s[w] && Z(s[w]), s[w] = ze(() => mi(e, () => h))), _[w] = h;
      }
      u = _;
    }), f) {
      var v = (
        /** @type {HTMLSelectElement} */
        e
      );
      Ht(() => {
        Rt(
          v,
          /** @type {Record<string | symbol, any>} */
          u.value,
          !0
        ), Ai(v);
      });
    }
    c = !0;
  });
}
function an(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [nn]: e.nodeName.includes("-"),
      [ln]: e.namespaceURI === Cn
    }
  );
}
var or = /* @__PURE__ */ new Map();
function un(e) {
  var t = or.get(e.nodeName);
  if (t) return t;
  or.set(e.nodeName, t = []);
  for (var r, n = e, i = Element.prototype; i !== n; ) {
    r = cn(n);
    for (var l in r)
      r[l].set && t.push(l);
    n = dr(n);
  }
  return t;
}
function Ci(e, t, r = t) {
  var n = /* @__PURE__ */ new WeakSet();
  hi(e, "input", (i) => {
    var l = i ? e.defaultValue : e.value;
    if (l = kt(e) ? It(l) : l, r(l), D !== null && n.add(D), l !== (l = t())) {
      var a = e.selectionStart, u = e.selectionEnd;
      e.value = l ?? "", u !== null && (e.selectionStart = a, e.selectionEnd = Math.min(u, e.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  zr(t) == null && e.value && (r(kt(e) ? It(e.value) : e.value), D !== null && n.add(D)), Dr(() => {
    var i = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        tt ?? D
      );
      if (n.has(l))
        return;
    }
    kt(e) && i === It(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function kt(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function It(e) {
  return e === "" ? null : +e;
}
function cr(e, t) {
  return e === t || e?.[xe] === t;
}
function vt(e = {}, t, r, n) {
  return Ht(() => {
    var i, l;
    return Dr(() => {
      i = l, l = [], zr(() => {
        e !== r(...l) && (t(e, ...l), i && cr(r(...i), e) && t(null, ...i));
      });
    }), () => {
      bt(() => {
        l && cr(r(...l), e) && t(null, ...l);
      });
    };
  }), e;
}
const Ni = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
// @__NO_SIDE_EFFECTS__
function fn(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    Ni
  );
}
function rt(e, t, r, n) {
  var i = (
    /** @type {V} */
    n
  ), l = !0, a = () => (l && (l = !1, i = /** @type {V} */
  n), i), u;
  u = /** @type {V} */
  e[t], u === void 0 && n !== void 0 && (u = a());
  var s;
  return s = () => {
    var f = (
      /** @type {V} */
      e[t]
    );
    return f === void 0 ? a() : (l = !0, f);
  }, s;
}
const Ri = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Ri);
const nt = {
  close() {
    setTimeout(() => {
      close();
    }, 500);
  },
  reg: {
    createSearch(e, t) {
      var r = /[-\/\\^$*+?.()|[\]{}]/, n = "";
      for (let i = 0; i < e.length; i++) {
        let l = e[i];
        if (r.test(l) ? n += `\\${l}` : n += l, i < e.length - 1) {
          let a = e[i + 1];
          r.test(a) && (a = `\\${a}`), n += `[^${a}]*`;
        }
      }
      return new RegExp(n, t);
    }
  }
}, et = {
  getAll() {
    return chrome.windows.getAll();
  },
  getCurrent() {
    return chrome.windows.getCurrent();
  },
  activate(e) {
    return chrome.windows.update(e, { focused: !0 });
  }
}, Tt = {
  async getAll() {
    const e = await chrome.bookmarks.getTree();
    var t = [], r = (n, i) => {
      if (n.bookmarkTreeNode?.children) {
        var l = n.title === "";
        n.bookmarkTreeNode.children.forEach((a) => {
          let u = {
            id: a.id,
            title: a.title || "",
            url: a.url || "",
            bookmarkTreeNode: a
          }, s = "";
          i ? s = a.title.replace(/\//g, "") : (s = n.path || "", s += "/" + a.title.replace(/\//g, "")), u.path = s.replace(/^\//g, ""), r(u, l);
        });
      } else
        n.type = "bookmark", /^javascript\:/.test(n.url) ? (n.isBookmarklet = !0, n.script = n.url, n.url = "bookmarklet") : n.favIconUrl = Di(n.url), t.push(n);
    };
    return e.forEach((n) => r({
      id: n.id,
      title: n.title,
      url: n.url || "",
      bookmarkTreeNode: n
    }, !0)), t;
  }
}, ce = {
  get(e) {
    return chrome.tabs.get(e);
  },
  getAll(e) {
    return chrome.tabs.query({ windowId: e });
  },
  async getCurrent() {
    return (await chrome.tabs.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      active: !0
    }))[0];
  },
  // TODO: サブドメインで分割、優先順位を考慮する (オプションページで設定)
  async sort(e = !1) {
    var t = e ? 1 : -1;
    return await new Promise(async (r) => {
      var n = [];
      for (const l of await et.getAll()) {
        var i = await ce.getAll(l.id);
        i = await new Promise(
          (a) => chrome.tabs.move(
            i.sort((u, s) => (u.url || "") < (s.url || "") ? t : -t).map((u) => u.id || 0),
            { index: -1 },
            (u) => a(u)
          )
        ), n = n.concat(i);
      }
      r(n);
    });
  },
  async getAllByAllWindow() {
    const e = await et.getAll();
    return (await Promise.all(e.map((r) => ce.getAll(r.id)))).flat();
  },
  async activate(e) {
    return (await et.getCurrent()).id !== e.windowId && await et.activate(e.windowId), chrome.tabs.update(e.id, { active: !0 });
  }
}, Pe = {
  get(e) {
    return new Promise((t) => chrome.storage.local.get(e, (r) => t(typeof e == "string" ? r[e] : r)));
  },
  set(e) {
    return chrome.storage.local.set(e);
  }
}, Gi = {
  STORAGE_KEY: "util_tabHistory",
  LOCK_STORAGE_KEY: "util_tabHistory_lock",
  _history: [],
  _historyIndex: 0,
  async load() {
    var e = await Pe.get(this.STORAGE_KEY);
    Object.assign(this, e);
  },
  save() {
    return Pe.set({
      [this.STORAGE_KEY]: {
        _history: this._history,
        _historyIndex: this._historyIndex
      }
    });
  },
  // 履歴内に同じタブがある場合はそのタブを消してから push
  push(e) {
    this._historyIndex !== 0 && (this._history = this._history.slice(0, this._history.length - this._historyIndex));
    var t = this._history.findIndex((r) => r === e.tabId);
    t !== -1 && this._history.splice(t, 1), this._history.push(e.tabId), this._historyIndex = 0;
  },
  // 現在のタブを取得
  get current() {
    return this._history[this._history.length - this._historyIndex - 1];
  },
  // カウンターを進めて取得
  back() {
    return this._historyIndex = Math.min(this._history.length - 1, this._historyIndex + 1), this.current;
  },
  // カウンターを戻して取得
  forward() {
    return this._historyIndex = Math.max(0, this._historyIndex - 1), this.current;
  },
  lock() {
    return Pe.set({ [this.LOCK_STORAGE_KEY]: !0 });
  },
  unlock() {
    return Pe.set({ [this.LOCK_STORAGE_KEY]: !1 });
  },
  isLocked() {
    return Pe.get(this.LOCK_STORAGE_KEY);
  },
  isFirst() {
    return this._historyIndex >= this._history.length - 1;
  },
  isLast() {
    return this._historyIndex <= 0;
  }
};
function Li(e, t) {
  let r;
  return Object.assign((...n) => {
    clearTimeout(r), r = setTimeout(() => e(...n), t);
  }, {
    cancel: () => clearTimeout(r)
  });
}
function Di(e) {
  const t = new URL(chrome.runtime.getURL("/_favicon/"));
  return t.searchParams.set("pageUrl", e), t.searchParams.set("size", "32"), t.toString();
}
var Mi = ["forEach", "isDisjointFrom", "isSubsetOf", "isSupersetOf"], Pi = ["difference", "intersection", "symmetricDifference", "union"], vr = !1;
class dt extends Set {
  /** @type {Map<T, Source<boolean>>} */
  #r = /* @__PURE__ */ new Map();
  #e = /* @__PURE__ */ P(0);
  #t = /* @__PURE__ */ P(0);
  #l = fe || -1;
  /**
   * @param {Iterable<T> | null | undefined} [value]
   */
  constructor(t) {
    if (super(), t) {
      for (var r of t)
        super.add(r);
      this.#t.v = super.size;
    }
    vr || this.#n();
  }
  /**
   * If the source is being created inside the same reaction as the SvelteSet instance,
   * we use `state` so that it will not be a dependency of the reaction. Otherwise we
   * use `source` so it will be.
   *
   * @template T
   * @param {T} value
   * @returns {Source<T>}
   */
  #s(t) {
    return fe === this.#l ? /* @__PURE__ */ P(t) : Se(t);
  }
  // We init as part of the first instance so that we can treeshake this class
  #n() {
    vr = !0;
    var t = dt.prototype, r = Set.prototype;
    for (const n of Mi)
      t[n] = function(...i) {
        return p(this.#e), r[n].apply(this, i);
      };
    for (const n of Pi)
      t[n] = function(...i) {
        p(this.#e);
        var l = (
          /** @type {Set<T>} */
          r[n].apply(this, i)
        );
        return new dt(l);
      };
  }
  /** @param {T} value */
  has(t) {
    var r = super.has(t), n = this.#r, i = n.get(t);
    if (i === void 0) {
      if (!r)
        return p(this.#e), !1;
      i = this.#s(!0), n.set(t, i);
    }
    return p(i), r;
  }
  /** @param {T} value */
  add(t) {
    return super.has(t) || (super.add(t), S(this.#t, super.size), ke(this.#e)), this;
  }
  /** @param {T} value */
  delete(t) {
    var r = super.delete(t), n = this.#r, i = n.get(t);
    return i !== void 0 && (n.delete(t), S(i, !1)), r && (S(this.#t, super.size), ke(this.#e)), r;
  }
  clear() {
    if (super.size !== 0) {
      super.clear();
      var t = this.#r;
      for (var r of t.values())
        S(r, !1);
      t.clear(), S(this.#t, 0), ke(this.#e);
    }
  }
  keys() {
    return this.values();
  }
  values() {
    return p(this.#e), super.values();
  }
  entries() {
    return p(this.#e), super.entries();
  }
  [Symbol.iterator]() {
    return this.keys();
  }
  get size() {
    return p(this.#t);
  }
}
var Ui = /* @__PURE__ */ Ge('<button><div class="mr4 flex-fixed s20 f fh bg-white rounded-4"><img class="object-fit-cover s16" alt=""/></div> <div><div class="line-clamp-2 word-break-all white-space-pre-wrap w-full fs12 lh12"> </div></div></button>');
function Fi(e, t) {
  He(t, !0);
  let r = rt(t, "selected", 3, !1), n = /* @__PURE__ */ fn(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "favIconUrl",
    "name",
    "selected"
  ]), i = /* @__PURE__ */ P(void 0), l = !1;
  ut(() => {
    !l && r() && p(i)?.scrollIntoView({ block: "nearest", inline: "nearest" }), l = r();
  });
  var a = Ui();
  sn(a, () => ({
    class: `f fm w-full text-left p4 border-bottom cursor-pointer ${r() ? "bg-link text-white" : "hover-bg-primary hover-text-white"}`,
    type: "button",
    ...n
  }));
  var u = F(a), s = F(u), f = ae(u, 2), c = F(f), v = F(c);
  vt(a, (o) => S(i, o), () => p(i)), Wt(() => {
    ct(s, "src", t.favIconUrl), ot(v, t.name);
  }), $e(e, a), We();
}
var ji = /* @__PURE__ */ Ge('<button><div class="mr4 flex-fixed s24 f fh bg-white rounded-4"><img class="object-fit-cover s20" alt=""/></div> <div><div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12"> </div> <div> </div></div></button>');
function Vi(e, t) {
  He(t, !0);
  let r = rt(t, "selected", 3, !1), n = rt(t, "favIconUrl", 3, ""), i = rt(t, "title", 3, ""), l = /* @__PURE__ */ fn(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "class",
    "selected",
    "favIconUrl",
    "title",
    "url"
  ]), a = /* @__PURE__ */ P(void 0), u = !1;
  ut(() => {
    !u && r() && p(a)?.scrollIntoView({ block: "nearest", inline: "nearest" }), u = r();
  });
  var s = ji();
  sn(s, () => ({
    class: `${t.class ?? ""} f fm w-full p4 border-bottom cursor-pointer text-left ${r() ? "bg-link text-white" : "hover-bg-primary hover-text-white"}`,
    type: "button",
    ...l
  }));
  var f = F(s), c = F(f), v = ae(f, 2), o = F(v), _ = F(o), h = ae(o, 2), w = F(h);
  vt(s, (y) => S(a, y), () => p(a)), Wt(() => {
    ct(c, "src", n()), ot(_, i()), rn(h, 1, `line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 ${r() ? "text-white" : "text-weak"}`), ot(w, t.url);
  }), $e(e, s), We();
}
function Bi(e, t, r) {
  S(t, !0), r();
}
var Ki = /* @__PURE__ */ Ge('<div><div class="bg-whitesmoke border-bottom w-full py8 px6 fs12 flex-fixed"> </div> <!></div>'), qi = /* @__PURE__ */ Ge('<form class="f flex-column s-full"><input class="input w-full fs12 flex-fixed letter-spacing-1" type="search"/> <div tabIndex="-1" class="outline-none f w-full overflow-hidden"><div class="flex-fixed w200 h-full f flex-column border-right"><div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">Shift + ↓↑</div> <div class="s-full overflow-scroll"></div></div> <div class="s-full f flex-column"><div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">↓↑</div> <div class="overflow-scroll s-full"></div></div></div></form>');
function $i(e, t) {
  He(t, !0);
  let r = null, n = /* @__PURE__ */ P(null), i = /* @__PURE__ */ P(void 0), l = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(""), u = /* @__PURE__ */ P([]), s = /* @__PURE__ */ P(0), f = /* @__PURE__ */ P(!1), c = /* @__PURE__ */ P(!1), v = !1, o = 0, _ = null;
  const h = new dt();
  Zn(() => {
    var d = null;
    S(n, null), r = null, p(u)?.some((k) => k.tabs.some((N) => {
      var R = N.__index === p(s);
      return R && (d = N, S(n, k)), R;
    })), d && (r = d);
  }), ut(() => {
    p(i)?.focus(), b();
  }), ut(() => {
    p(c) && (p(f) || r && O(r));
  });
  function w(d) {
    d.preventDefault(), S(c, !0);
  }
  function y(d, k) {
    if (!k) return [d];
    var N = k.toLowerCase(), R = nt.reg.createSearch(k, "i"), T = [], j = [];
    return d.forEach((m) => {
      var x = m.isBookmarklet ? -1 : m.url.indexOf(N), U = (m.type === "bookmark" ? m.path : m.title) || "", q = U.toLowerCase().indexOf(N);
      if (m.isSearchText = !1, m.searchText && (q = m.searchText.toLowerCase().indexOf(N), m.isSearchText = !0), x !== -1 || q !== -1)
        T.push({
          item: m,
          title: U,
          urlIndex: x === -1 ? 1 / 0 : x,
          titleIndex: q === -1 ? 1 / 0 : q
        });
      else {
        var J = m.isBookmarklet ? !1 : R.test(m.url), Je = R.test(U);
        m.isSearchText = !1, m.searchText && (m.isSearchText = !0, Je = Je || R.test(m.searchText)), (J || Je) && j.push({ title: U, item: m, urlTest: J, titleTest: Je });
      }
    }), [
      T.sort((m, x) => m.urlIndex === x.urlIndex ? m.titleIndex === x.titleIndex ? m.title.length - x.title.length : m.titleIndex - x.titleIndex : m.urlIndex - x.urlIndex).map((m) => m.item),
      j.sort((m, x) => {
        var U = Number(m.titleTest) + Number(m.urlTest), q = Number(x.titleTest) + Number(x.urlTest);
        return U === q ? m.title.length - x.title.length : q - U;
      }).map((m) => m.item)
    ];
  }
  async function M(d) {
    var k = [];
    if (/^\>/.test(d))
      k = await Tt.getAll(), k = k.filter((N) => N.isBookmarklet), d = d.slice(1);
    else if (/^\s/.test(d))
      k = await Tt.getAll(), k = k.filter((N) => !N.isBookmarklet), d = d.slice(1);
    else {
      let [N, R] = await Promise.all([ce.getAllByAllWindow(), Tt.getAll()]);
      k = N.map((T) => ({
        id: T.id ?? 0,
        title: T.title || "",
        url: T.url || "",
        favIconUrl: T.favIconUrl,
        tab: T
      })), R = R.filter((T) => !T.isBookmarklet), R.forEach((T) => {
        var j = k.find((m) => m.url === T.url);
        j && (j.searchText = T.path);
      });
    }
    if (d) {
      const N = [];
      d.split(/\s+/).reduce(
        (R, T) => {
          const j = [];
          return R.forEach((m) => {
            y(m, T).forEach((x) => {
              x.length > 0 && j.push(x);
            });
          }), j;
        },
        [k]
      ).forEach((R) => R.forEach((T) => N.push(T))), k = N;
    }
    return k;
  }
  async function b() {
    var d = p(a), k = await M(d), N = {}, R = [], T = /^.*\:\/\/([^\/]*)\//i, j = (x) => {
      var U = null;
      if (x.isBookmarklet)
        U = "ブックマークレット";
      else {
        var q = x.url.match(T);
        q && (U = q[1].replace(/^www\./, "").replace(/\:\d+/, "")), U || (U = "その他");
      }
      var J = N[U];
      J || (J = N[U] = { favIconUrl: x.favIconUrl, name: U, tabs: [] }, R.push(J)), J.tabs.push(x);
    }, m = () => {
      var x = 0;
      R.forEach((U, q) => {
        U.__index = q, U.tabs.forEach((J) => {
          J.__index = x++;
        });
      }), o = x;
    };
    k.forEach(j), m(), S(u, R), S(s, 0), S(f, !1), p(l) && (p(l).scrollTop = 0);
  }
  const E = Li(b, 64);
  async function O(d) {
    if (d.isBookmarklet) {
      const T = (await ce.getCurrent()).id;
      if (typeof T != "number") {
        console.error("Current tab ID is not a number:", T);
        return;
      }
      if (!d.script || !d.script.startsWith("javascript:")) {
        console.error("Invalid bookmarklet script:", d.script);
        return;
      }
      if (!chrome.userScripts) {
        alert("拡張機能の設定画面から「ユーザー スクリプトを許可する」を有効にしてください。");
        return;
      }
      await chrome.userScripts.execute({
        js: [
          {
            code: decodeURIComponent(d.script.slice(11))
          }
        ],
        world: "MAIN",
        target: { tabId: T },
        injectImmediately: !0
      }).catch((j) => {
        console.error(j.message);
      }), close();
    } else if (d.type === "bookmark") {
      var k = await ce.getAllByAllWindow(), N = d.url.replace(/\/$/g, ""), R = k.find((T) => (T.url || "").replace(/\/$/g, "") === N);
      R ? (ce.activate(R), nt.close()) : open(d.url);
    } else
      d.tab && ce.activate(d.tab), nt.close();
  }
  function L(d) {
    S(s, d.tabs[0]?.__index || 0, !0);
  }
  function g(d) {
    return typeof d?.tab?.id == "number" ? h.has(d.tab.id) : !1;
  }
  function C(d) {
    typeof d?.tab?.id == "number" && (g(d) || (h.add(d.tab.id), chrome.tabs.remove(d.tab.id)));
  }
  function Y(d) {
    var k = d.code, N = k === "ArrowUp", R = k === "ArrowDown", T = p(n);
    if (d.ctrlKey) {
      var j = {
        d() {
          d.preventDefault();
          var x = v ? _ : r;
          x && C(x);
        }
      }[d.key];
      j?.();
      return;
    }
    if (d.shiftKey) {
      if (N) {
        if (d.preventDefault(), v = !1, T) {
          var m = p(u)[Math.max(0, (T.__index || 0) - 1)];
          m && S(s, m.tabs[0].__index || 0, !0);
        }
      } else if (R && (d.preventDefault(), v = !1, T)) {
        var m = p(u)[Math.min(p(u).length - 1, (T.__index || 0) + 1)];
        m && S(s, m.tabs[0].__index || 0, !0);
      }
    } else N ? (d.preventDefault(), v = !1, S(s, Math.max(0, p(s) - 1), !0)) : R ? (d.preventDefault(), v = !1, S(s, Math.min(o - 1, p(s) + 1), !0)) : document.activeElement !== p(i) && p(i)?.focus();
  }
  function ye() {
    v = !0;
  }
  function Ne(d) {
    _ = d;
  }
  var re = qi();
  re.__keydown = Y, re.__mousemove = ye;
  var H = F(re);
  H.__input = [Bi, f, E], vt(H, (d) => S(i, d), () => p(i));
  var Xe = ae(H, 2), me = F(Xe), _e = ae(F(me), 2);
  yt(_e, 21, () => p(u), (d) => d.name, (d, k) => {
    {
      let N = /* @__PURE__ */ Qe(() => p(n) === p(k));
      Fi(d, {
        get name() {
          return p(k).name;
        },
        get favIconUrl() {
          return p(k).favIconUrl;
        },
        get selected() {
          return p(N);
        },
        onclick: () => L(p(k))
      });
    }
  });
  var Re = ae(me, 2), Ze = ae(F(Re), 2);
  yt(Ze, 21, () => p(u), (d) => d.name, (d, k) => {
    var N = Ki(), R = F(N), T = F(R), j = ae(R, 2);
    yt(j, 17, () => p(k).tabs, (m) => m.id, (m, x) => {
      {
        let U = /* @__PURE__ */ Qe(() => g(p(x)) ? "opacity-50 pointer-none" : ""), q = /* @__PURE__ */ Qe(() => p(x).isSearchText ? p(x).searchText : p(x).title), J = /* @__PURE__ */ Qe(() => p(x).__index === p(s));
        Vi(m, {
          get class() {
            return p(U);
          },
          get favIconUrl() {
            return p(x).favIconUrl;
          },
          get title() {
            return p(q);
          },
          get url() {
            return p(x).url;
          },
          onclick: () => O(p(x)),
          get selected() {
            return p(J);
          },
          onmouseenter: () => Ne(p(x))
        });
      }
    }), Wt(() => ot(T, p(k).name)), $e(d, N);
  }), vt(Ze, (d) => S(l, d), () => p(l)), Jr("submit", re, w), Ci(H, () => p(a), (d) => S(a, d)), $e(e, re), We();
}
Xt(["keydown", "mousemove", "input"]);
async function Yi() {
  await ce.sort(), nt.close();
}
var Hi = /* @__PURE__ */ Ge('<main class="svelte-ifndvb"><div class="f flex-column s-full"><div class="f flex-column h0 flex-auto w-full"><!></div> <button type="button" class="button primary flex-fixed">タブソート</button></div></main>');
function Xi(e, t) {
  He(t, !0);
  var r = Hi();
  Jr("keydown", Ct, (u) => {
    (u.metaKey || u.ctrlKey) && u.key === "p" && (u.preventDefault(), close());
  });
  var n = F(r), i = F(n), l = F(i);
  $i(l, {});
  var a = ae(i, 2);
  a.__click = [Yi], $e(e, r), We();
}
Xt(["click"]);
export {
  Xi as Main,
  zi as mount,
  Gi as tabHistory,
  ce as tabUtil
};
